import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const JobStatusStore = types.model('JobStatusStore').props({
  id: types.identifier,
  name: types.string,
});

type JobStatusStoreInstance = Instance<typeof JobStatusStore>;
export interface JobStatus extends JobStatusStoreInstance {}

type JobStatusStoreSnapshotType = SnapshotOut<typeof JobStatusStore>;
export interface JobStatusStoreSnapshot extends JobStatusStoreSnapshotType {}
