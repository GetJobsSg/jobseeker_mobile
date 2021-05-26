import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore, authInitialState } from '../auth_store/auth';

export const RootStore = types.model('RootStore').props({
  authStore: AuthStore,
});

// // initialize values
export const rootStore = RootStore.create({
  authStore: authInitialState,
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
