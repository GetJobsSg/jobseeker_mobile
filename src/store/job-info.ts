import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { CompanyStore } from './company';
import { CategoryStore } from './category';

export const JobInfoStore = types.model('JobInfoStore').props({
  id: types.identifier,
  referenceCode: types.string,
  title: types.string,
  requirements: types.string,
  responsibilities: types.string,
  startDate: types.string,
  endDate: types.string,
  startTime: types.string,
  endTime: types.string,
  hourlyRate: types.number,
  hourlyBillRate: types.number,
  startCode: types.number,
  endCode: types.number,
  jobStatus: types.enumeration(['1', '2', '3', '4']),
  company: types.maybe(types.reference(types.late(() => CompanyStore))),
  category: types.maybe(types.reference(types.late(() => CategoryStore))),
});

type JobInfoStoreInstance = Instance<typeof JobInfoStore>;
export interface JobInfo extends JobInfoStoreInstance {}

type JobInfoStoreSnapshotType = SnapshotOut<typeof JobInfoStore>;
export interface JobInfoStoreSnapshot extends JobInfoStoreSnapshotType {}
