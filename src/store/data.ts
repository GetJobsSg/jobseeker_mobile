import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { ApplicationStatusStore } from './status-application';
import { JobStatusStore } from './status-job';
import { CategoryStore } from './category';
import { withRootStore, withErrorHandler } from './extensions';
import * as apis from '../apis';

type Category = {
  id: string;
  name: string;
};
interface CategoriesResponse {
  data: Category[];
}

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
    setCategories(categories: CategoriesResponse) {
      categories.data.forEach((category) => {
        const id = String(category.id);
        self.categories.set(id, { id, name: category.name });
      });
    },

    setJobStatus() {},

    setApplicationStatus() {},
  }))
  .actions((self) => ({
    initData: flow(function* initData() {
      try {
        self.isLoading = true;
        const [
          categories,
          // jobStatus, applicationStatus
        ] = yield Promise.all([apis.getCategories(), apis.getJobStatus(), apis.getApplicationStatus()]);

        self.setCategories(categories);

        // TODO: set status data to dataStore
        // self.setJobStatus(jobStatus);
        // self.setApplicationStatus(applicationStatus);
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
