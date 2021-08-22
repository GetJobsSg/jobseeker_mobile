import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { EducationResponse } from '../modules/profile/types';
import { EducationStore } from './education';
import * as apis from '../apis';

export const EducationLevelStore = types
  .model('EducationLevelStore')
  .props({
    educationLevel: types.optional(types.array(EducationStore), []),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions((self) => ({
    getEducationLevel: flow(function* getEducationLevel() {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getEducationLevel());
        self.educationLevel.clear();

        res.data.forEach((item: EducationResponse) => {
          self.educationLevel.push({
            id: item.id,
            name: item.name,
          });
        });
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type EducationLevelStoreInstance = Instance<typeof EducationLevelStore>;
export interface EducationLevel extends EducationLevelStoreInstance {}

type EducationLevelStoreSnapshotType = SnapshotOut<typeof EducationLevelStore>;
export interface EducationLevelStoreSnapshot extends EducationLevelStoreSnapshotType {}
