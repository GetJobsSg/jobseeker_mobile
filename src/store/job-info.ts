import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { CompanyStore } from './company';
import { CategoryStore } from './category';

export const JobInfoStore = types
  .model('JobInfoStore')
  .props({
    id: types.optional(types.identifier, ''),
    referenceCode: types.optional(types.string, ''),
    title: types.optional(types.string, ''),
    requirements: types.optional(types.string, ''),
    responsibilities: types.optional(types.string, ''),
    startDate: types.optional(types.string, ''),
    endDate: types.optional(types.string, ''),
    startTime: types.optional(types.string, ''),
    endTime: types.optional(types.string, ''),
    hourlyRate: types.optional(types.number, 0),
    startCode: types.optional(types.string, ''),
    endCode: types.optional(types.string, ''),
    jobStatus: types.maybe(types.number),
    company: types.optional(CompanyStore, {}),
    category: types.optional(CategoryStore, {}),
  })
  .views((self) => ({
    get formattedHourlyRate() {
      return `S$${self.hourlyRate.toFixed(1)}/hr`;
    },
  }))
  .actions(() => ({
    // TODO: create transformer to transform data with fallback value
  }));

type JobInfoStoreInstance = Instance<typeof JobInfoStore>;
export interface JobInfo extends JobInfoStoreInstance {}

type JobInfoStoreSnapshotType = SnapshotOut<typeof JobInfoStore>;
export interface JobInfoStoreSnapshot extends JobInfoStoreSnapshotType {}
