import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const LocationStore = types.model('LocationStore').props({
  id: types.optional(types.number, 0),
  address: types.optional(types.string, ''),
  postalCode: types.optional(types.string, ''),
  blockNo: types.optional(types.string, ''),
  unitNo: types.optional(types.string, ''),
});

type LocationStoreInstance = Instance<typeof LocationStore>;
export interface Location extends LocationStoreInstance {}

type LocationStoreSnapshotType = SnapshotOut<typeof LocationStore>;
export interface LocationStoreSnapshot extends LocationStoreSnapshotType {}
