import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { ApplicationStatus, JobStatus } from '../constants/types';
import { withErrorHandler } from './extensions';
import { CompanyStore } from './company';
import { CategoryStore } from './category';
import { JobStatusStore } from './status-job';
import { LocationStore } from './location';
import * as apis from '../apis';
import { constructDateRange, convertTimeStringToAmPm } from '../utils/dateTime';

export const JobInfoStore = types
  .model('JobInfoStore')
  .props({
    // job info
    id: types.optional(types.number, 0),
    referenceCode: types.optional(types.string, ''),
    title: types.optional(types.string, ''),
    requirements: types.optional(types.string, ''),
    responsibilities: types.optional(types.string, ''),
    startDate: types.optional(types.string, ''),
    endDate: types.optional(types.string, ''),
    startTime: types.optional(types.string, ''),
    endTime: types.optional(types.string, ''),
    hourlyRate: types.optional(types.number, 0),
    startCode: types.optional(types.string, ''),
    endCode: types.optional(types.string, ''),
    jobStatus: types.optional(JobStatusStore, {}),
    category: types.optional(CategoryStore, {}),
    location: types.optional(LocationStore, {}),
    company: types.optional(CompanyStore, {}),
    applicationStatusId: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    isApplying: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),

    // job offer
    isLoadingAcceptOffer: types.optional(types.boolean, false),
    isLoadingDeclineOffer: types.optional(types.boolean, false),

    // clock in
    isLoadingClockIn: types.optional(types.boolean, false),
    clockInTime: types.optional(types.string, ''),
    clockInError: types.optional(types.string, ''),

    // clock out
    isLoadingClockOut: types.optional(types.boolean, false),
    clockOutTime: types.optional(types.string, ''),
    clockOutError: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .views((self) => ({
    get formattedHourlyRate() {
      return `S$${self.hourlyRate.toFixed(2)}/hr`;
    },
    get formattedDate() {
      return constructDateRange(self.startDate, self.endDate);
    },
    get formattedTime() {
      const startTime = convertTimeStringToAmPm(self.startTime);
      const endTime = convertTimeStringToAmPm(self.endTime);
      return `${startTime} - ${endTime}`;
    },
    get isAllowApply() {
      return self.applicationStatusId === ApplicationStatus.NONE;
    },
    get isAllowToAcceptOffer() {
      return self.jobStatus.id === JobStatus.OPEN;
    },
    get isOfferAccepted() {
      return self.applicationStatusId === ApplicationStatus.ACCEPTED;
    },
    get isOfferDeclined() {
      return self.applicationStatusId === ApplicationStatus.REJECTED;
    },
  }))
  .actions((self) => ({
    getJobDetails: flow(function* getJobDetails(id: number) {
      try {
        self.isLoading = true;
        const { data } = yield* toGenerator(apis.getJobDetails(id));
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { job, job_application_status_id, job_locations } = data;

        // jobInfo
        self.id = job.id;
        self.title = job.title;
        self.hourlyRate = job.hourly_rate;
        self.startDate = job.start_date;
        self.endDate = job.end_date;
        self.startTime = job.start_time;
        self.endTime = job.end_time;
        self.requirements = job.requirements;
        self.responsibilities = job.responsibilities;

        // address
        self.location.address = job_locations[0]?.address;

        // companyInfo
        self.company.id = job.company.id;
        self.company.name = job.company.name;

        // job status
        self.jobStatus.id = job.job_status.id;
        self.jobStatus.name = job.job_status.name;

        // application status
        self.applicationStatusId = job_application_status_id;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    applyJob: flow(function* applyJob(id: number) {
      try {
        self.isApplying = true;
        yield* toGenerator(apis.applyJob(id));
        self.applicationStatusId = ApplicationStatus.PENDING;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isApplying = false;
      }
    }),

    acceptJobOffer: flow(function* acceptJobOffer(id: number) {
      try {
        self.isLoadingAcceptOffer = true;
        yield* toGenerator(apis.acceptOffer(id));
        self.applicationStatusId = ApplicationStatus.ACCEPTED;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoadingAcceptOffer = false;
      }
    }),

    declineJobOffer: flow(function* declineJobOffer(id: number) {
      try {
        self.isLoadingDeclineOffer = true;
        yield* toGenerator(apis.declineOffer(id));
        self.applicationStatusId = ApplicationStatus.REJECTED;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoadingDeclineOffer = false;
      }
    }),

    clockInJob: flow(function* clockInJob(id: number, code: string) {
      try {
        self.isLoadingClockIn = true;
        yield* toGenerator(apis.clockIn(id, code));
      } catch (e) {
        self.clockInError = self.getErrMsg(e);
      } finally {
        self.isLoadingClockIn = false;
      }
    }),

    clockOutJob: flow(function* clockOutJob(id: number, code: string) {
      try {
        self.isLoadingClockOut = true;
        yield* toGenerator(apis.clockOut(id, code));
      } catch (e) {
        self.clockOutError = self.getErrMsg(e);
      } finally {
        self.isLoadingClockOut = false;
      }
    }),
  }));

type JobInfoStoreInstance = Instance<typeof JobInfoStore>;
export interface JobInfo extends JobInfoStoreInstance {}

type JobInfoStoreSnapshotType = SnapshotOut<typeof JobInfoStore>;
export interface JobInfoStoreSnapshot extends JobInfoStoreSnapshotType {}
