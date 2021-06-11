import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const ApplicationStatusStore = types.model('ApplicationStatusStore').props({
  id: types.identifier,
  name: types.string,
});

type ApplicationStatusStoreInstance = Instance<typeof ApplicationStatusStore>;
export interface ApplicationStatus extends ApplicationStatusStoreInstance {}

type ApplicationStatusStoreSnapshotType = SnapshotOut<typeof ApplicationStatusStore>;
export interface ApplicationStatusStoreSnapshot extends ApplicationStatusStoreSnapshotType {}
