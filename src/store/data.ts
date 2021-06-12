import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { ApplicationStatusStore } from './status-application';
import { JobStatusStore } from './status-job';
import { CategoryStore } from './category';
import { withRootStore, withErrorHandler } from './extensions';
import * as apis from '../apis';

// some compulsory data need to be loaded first before the app start
export const DataStore = types
  .model('DataStore')
  .props({
    jobStatus: types.map(JobStatusStore),
    categories: types.map(CategoryStore),
    applicationStatus: types.map(ApplicationStatusStore),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withRootStore)
  .extend(withErrorHandler)
  .actions((self) => ({
    initData: flow(function* initData() {
      try {
        self.isLoading = true;
        yield Promise.all([
          apis.getCategories(),
          // apis.getJobStatus(),
          // apis.getApplicationStatus(),
        ]);
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type DataStoreInstance = Instance<typeof DataStore>;
export interface Data extends DataStoreInstance {}

type DataStoreSnapshotType = SnapshotOut<typeof DataStore>;
export interface DataStoreSnapshot extends DataStoreSnapshotType {}
