import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const DressCodeStore = types.model('DressCodeStore').props({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
});

type DressCodeStoreInstance = Instance<typeof DressCodeStore>;
export interface Category extends DressCodeStoreInstance {}

type DressCodeStoreSnapshotType = SnapshotOut<typeof DressCodeStore>;
export interface DressCodeStoreSnapshot extends DressCodeStoreSnapshotType {}
