import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const CompanyStore = types.model('CompanyStore').props({
  id: types.identifier,
  name: types.string,
  description: types.string,
  logo: types.string,
});

type CompanyInstance = Instance<typeof CompanyStore>;
export interface Company extends CompanyInstance {}

type CompanySnapshotType = SnapshotOut<typeof CompanyStore>;
export interface CompanySnapshot extends CompanySnapshotType {}
