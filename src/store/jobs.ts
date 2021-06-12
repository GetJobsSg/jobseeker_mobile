import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { JobInfoStore } from './job-info';
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
  .actions((self) => ({
    getRecentJobs: flow(function* getRecentJobs() {
      try {
        self.isLoadingRecentJobs = true;
        const res = yield* toGenerator(apis.getAllJobs());
        self.recentJobs.clear();
        res.data.forEach((item) => {
          self.recentJobs.push({
            id: item.job.id,
            title: item.job.title,
            hourlyRate: item.job.hourly_rate,
            startDate: item.job.start_date,
            endDate: item.job.end_date,
            startTime: item.job.start_time,
            endTime: item.job.end_time,
            jobStatus: {
              id: item.job.job_status.id,
              name: item.job.job_status.name,
            },
            category: {
              id: item.job.job_category.id,
              name: item.job.job_category.name,
            },
            location: {
              id: item?.job_locations[0]?.id,
              address: item?.job_locations[0]?.address,
            },
            company: {
              id: item.job.company.id,
              name: item.job.company.name,
            },
          });
        });
      } catch (e) {
        self.errorRecentJobs = self.getErrMsg(e);
      } finally {
        self.isLoadingRecentJobs = false;
      }
    }),
  }));

type JobStoreInstance = Instance<typeof JobStore>;
export interface Job extends JobStoreInstance {}

type JobStoreSnapshotType = SnapshotOut<typeof JobStore>;
export interface JobStoreSnapshot extends JobStoreSnapshotType {}
