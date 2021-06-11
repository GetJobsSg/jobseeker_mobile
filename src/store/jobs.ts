import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler, withRootStore } from './extensions';
import { JobInfoStore } from './job-info';
import * as apis from '../apis';
// import { CompanyStore } from './company';

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
  .extend(withRootStore)
  .actions((self) => ({
    getRecentJobs: flow(function* getRecentJobs() {
      try {
        self.isLoadingRecentJobs = true;
        const res = yield* toGenerator(apis.getAllJobs());
        res.data.forEach((item) => {
          self.recentJobs.push({
            id: String(item.job.id),
            title: item.job.title,
            startDate: item.job.start_date,
            hourlyRate: item.job.hourly_rate,
            // company: CompanyStore.create({}),
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
