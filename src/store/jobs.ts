import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { JobDetails } from 'src/modules/job/types';
import { withErrorHandler } from './extensions';
import { JobInfoStore, JobInfo } from './job-info';
import * as apis from '../apis';

export const JobStore = types
  .model('JobStore')
  .props({
    recentJobs: types.optional(types.array(JobInfoStore), []),
    isLoadingRecentJobs: types.optional(types.boolean, false),
    errorRecentJobs: types.optional(types.string, ''),

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
    transformToState(data: JobDetails): Partial<JobInfo> {
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
      };
    },
  }))
  .actions((self) => ({
    getRecentJobs: flow(function* getRecentJobs() {
      try {
        self.isLoadingRecentJobs = true;
        const res = yield* toGenerator(apis.getAllJobs());
        self.recentJobs.clear();
        res.data.forEach((item) => {
          self.recentJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorRecentJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingRecentJobs = false;
      }
    }),

    getAppliedJobs: flow(function* getAppliedJobs() {
      try {
        self.isLoadingAppliedJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'applied' }));
        self.appliedJobs.clear();
        res.data.forEach((item) => {
          self.appliedJobs.push(self.transformToState(item));
        });
      } catch (e) {
        self.errorAppliedJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingAppliedJobs = false;
      }
    }),

    getOnGoingJobs: function getOnGoingJobs() {},

    getUpcomingJobs: flow(function* getUpcomingJobs() {
      try {
        self.isLoadingUpcomingJobs = true;
        const res = yield* toGenerator(apis.getMyJobs({ status: 'upcoming' }));
        self.upcomingJobs.clear();
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
        self.appliedJobs.clear();
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
