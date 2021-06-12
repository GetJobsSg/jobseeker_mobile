import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const CategoryStore = types.model('CategoryStore').props({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
});

type CategoryStoreInstance = Instance<typeof CategoryStore>;
export interface Category extends CategoryStoreInstance {}

type CategoryStoreSnapshotType = SnapshotOut<typeof CategoryStore>;
export interface CategoryStoreSnapshot extends CategoryStoreSnapshotType {}
