import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const CategoryStore = types
  .model('CategoryStore')
  .props({
    id: types.optional(types.identifier, ''),
    name: types.optional(types.string, ''),
  })
  .actions(() => ({
    transformToState(data: any) {
      return {
        id: data.id || '',
        name: data.name || '',
      };
    },
  }));

type CategoryStoreInstance = Instance<typeof CategoryStore>;
export interface Category extends CategoryStoreInstance {}

type CategoryStoreSnapshotType = SnapshotOut<typeof CategoryStore>;
export interface CategoryStoreSnapshot extends CategoryStoreSnapshotType {}
