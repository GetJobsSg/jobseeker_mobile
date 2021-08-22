import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const EducationStore = types.model('EducationStore').props({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
});

type EducationStoreInstance = Instance<typeof EducationStore>;
export interface Education extends EducationStoreInstance {}

type EducationStoreSnapshotType = SnapshotOut<typeof EducationStore>;
export interface EducationStoreSnapshot extends EducationStoreSnapshotType {}
