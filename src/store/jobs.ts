import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { JobDetails } from 'src/modules/job/types';
import { withErrorHandler } from './extensions';
import { JobInfoStore } from './job-info';
import * as apis from '../apis';

export const JobStore = types
  .model('JobStore')
  .props({
    recentJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingRecentJobs: types.optional(types.boolean, false),
    errorRecentJobs: types.optional(types.string, ''),

    companyJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingCompanyJobs: types.optional(types.boolean, false),
    errorCompanyJobs: types.optional(types.string, ''),

    appliedJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingAppliedJobs: types.optional(types.boolean, false),
    errorAppliedJobs: types.optional(types.string, ''),

    completedJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingCompletedJobs: types.optional(types.boolean, false),
    errorCompletedJobs: types.optional(types.string, ''),

    onGoingJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingOnGoingJobs: types.optional(types.boolean, false),
    errorOnGoingJobs: types.optional(types.string, ''),

    upcomingJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingUpcomingJobs: types.optional(types.boolean, false),
    errorUpcomingJobs: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions(() => ({
    transformToState(data: JobDetails) {
      return {
        id: data.job.id,
        title: data.job.title,
        hourlyRate: data.job.hourly_rate,
        startDate: data.job.start_date,
        endDate: data.job.end_date,
        startTime: data.job.start_time,
        endTime: data.job.end_time,
        jobStatus: {
          id: data.job.job_status.id,
          name: data.job.job_status.name,
        },
        category: {
          id: data.job.job_category.id,
          name: data.job.job_category.name,
        },
        location: {
          id: data?.job_locations[0]?.id,
          address: data?.job_locations[0]?.address,
          postalCode: data.job_locations[0]?.postal_code,
          blockNo: data.job_locations[0]?.block_no,
          unitNo: data.job_locations[0]?.unit_no,
        },
        company: {
          id: data.job.company.id,
          name: data.job.company.name,
          description: data.job.company.desc,
          logo: data.job.company.logo_img,
        },
        applicationStatusId: data.job_application_status_id,
      };
    },
  }))
  .actions((self) => ({
    getRecentJobs: flow(function* getRecentJobs() {
      try {
        self.isLoadingRecentJobs = true;
        const res = yield* toGenerator(apis.getAllJobs());
        self.recentJobs.clear();

        if (!res?.data) return;

        res.data.forEach((item) => {
          self.recentJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorRecentJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingRecentJobs = false;
      }
    }),

    getCompanyJobs: flow(function* getCompanyJobs(id: number) {
      try {
        self.isLoadingCompanyJobs = true;
        const res = yield* toGenerator(apis.getCompanyJobs(id));
        self.companyJobs.clear();

        if (!res?.data) return;

        res.data.forEach((item) => {
          self.companyJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorCompanyJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingCompanyJobs = false;
      }
    }),

    getAppliedJobs: flow(function* getAppliedJobs() {
      try {
        self.isLoadingAppliedJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'applied' }));
        self.appliedJobs.clear();

        if (!res?.data) return;

        res.data.forEach((item) => {
          console.log(self.transformToState(item));
          self.appliedJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorAppliedJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingAppliedJobs = false;
      }
    }),

    getOnGoingJobs: flow(function* getOnGoingJobs() {
      try {
        self.isLoadingOnGoingJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'ongoing' }));
        self.onGoingJobs.clear();

        if (!res?.data) return;

        res.data.forEach(
          flow(function* (item) {
            const attendanceRes = yield* toGenerator(apis.getAttendanceDetails(item.job.id));
            self.onGoingJobs.push({
              ...self.transformToState(item),
              clockInTime: attendanceRes.data[0].clock_in_time || '',
              clockOutTime: attendanceRes.data[0].clock_out_time || '',
            });
          }),
        );
      } catch (e) {
        self.errorOnGoingJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingOnGoingJobs = false;
      }
    }),

    getUpcomingJobs: flow(function* getUpcomingJobs() {
      try {
        self.isLoadingUpcomingJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'upcoming' }));
        self.upcomingJobs.clear();

        if (!res?.data) return;

        res.data.forEach((item) => {
          self.upcomingJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorUpcomingJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingUpcomingJobs = false;
      }
    }),

    getCompletedJobs: flow(function* getUpcomingJobs() {
      try {
        self.isLoadingCompletedJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'completed' }));
        self.completedJobs.clear();

        if (!res?.data) return;

        res.data.forEach((item) => {
          self.completedJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorCompletedJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingCompletedJobs = false;
      }
    }),
  }));

type JobStoreInstance = Instance<typeof JobStore>;
export interface Job extends JobStoreInstance {}

type JobStoreSnapshotType = SnapshotOut<typeof JobStore>;
export interface JobStoreSnapshot extends JobStoreSnapshotType {}
