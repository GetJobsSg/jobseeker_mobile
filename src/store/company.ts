import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const CompanyStore = types.model('CompanyStore').props({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  description: types.optional(types.string, ''),
  logo: types.optional(types.string, ''),
});

type CompanyInstance = Instance<typeof CompanyStore>;
export interface Company extends CompanyInstance {}

type CompanySnapshotType = SnapshotOut<typeof CompanyStore>;
export interface CompanySnapshot extends CompanySnapshotType {}
