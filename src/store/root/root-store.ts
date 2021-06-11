import { Instance, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore } from '../auth';
import { UiStore } from '../ui';
import { UserStore } from '../user';
import { WalletStore } from '../wallet';
import { JobInfoStore } from '../job-info';
import { JobStore } from '../jobs';
import { DataStore } from '../data';

export const RootStore = types.model('RootStore').props({
  authStore: types.optional(AuthStore, {} as any),
  userStore: types.optional(UserStore, {} as any),
  jobsStore: types.optional(JobStore, {} as any),
  jobInfoStore: types.optional(JobInfoStore, {} as any),
  dataStore: types.optional(DataStore, {} as any),
  walletStore: types.optional(WalletStore, {} as any),
  uiStore: types.optional(UiStore, {} as any),
});

// // initialize values
export const rootStore = RootStore.create({
  authStore: {},
  userStore: {},
  jobsStore: {},
  jobInfoStore: {},
  dataStore: {},
  walletStore: {},
  uiStore: {},
});

// print snapShot in local development
if (__DEV__) {
  onSnapshot(rootStore, (snap) => {
    // eslint-disable-next-line no-console
    console.log('rootStore::', snap);
  });
}

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
