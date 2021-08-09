import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const BankStore = types.model('BankStore').props({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  code: types.optional(types.string, ''),
  bic: types.optional(types.string, ''),
});

type BankStoreInstance = Instance<typeof BankStore>;
export interface Bank extends BankStoreInstance {}

type BankStoreSnapshotType = SnapshotOut<typeof BankStore>;
export interface BankStoreSnapshot extends BankStoreSnapshotType {}
