import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const UiStore = types
  .model('UiStore')
  .props({
    loadingCount: types.optional(types.number, 0),
  })
  .views((self) => ({
    get isGlobalLoading() {
      return self.loadingCount > 0;
    },
  }))
  .actions((self) => ({
    showLoadingSpinner() {
      self.loadingCount += 1;
    },
    hideLoadingSpinner() {
      self.loadingCount -= 1;
    },
  }));

type UiStoreInstance = Instance<typeof UiStore>;
export interface UI extends UiStoreInstance {}

type UiStoreSnapshotType = SnapshotOut<typeof UiStore>;
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
