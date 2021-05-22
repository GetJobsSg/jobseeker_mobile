import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore } from '../auth_store/auth';

export const RootStore = types.model('RootStore').props({
  authStore: types.optional(AuthStore, {} as any),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
