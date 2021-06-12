import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
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
    error: types.optional(types.string, ''),
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
  }))
  .actions((self) => ({
    getJobDetails: flow(function* getJobDetails(id: number) {
      try {
        self.isLoading = true;
        const { data } = yield* toGenerator(apis.getJobDetails(id));
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { job, job_application_status_id, job_locations } = data;

        // jobInfo
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

        // application status
        self.applicationStatusId = job_application_status_id;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type JobInfoStoreInstance = Instance<typeof JobInfoStore>;
export interface JobInfo extends JobInfoStoreInstance {}

type JobInfoStoreSnapshotType = SnapshotOut<typeof JobInfoStore>;
export interface JobInfoStoreSnapshot extends JobInfoStoreSnapshotType {}
