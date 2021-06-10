import { Instance, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore } from '../auth';
import { UiStore } from '../ui';
import { UserStore } from '../user';
import { WalletStore } from '../wallet';

export const RootStore = types.model('RootStore').props({
  authStore: types.optional(AuthStore, {} as any),
  userStore: types.optional(UserStore, {} as any),
  walletStore: types.optional(WalletStore, {} as any),
  uiStore: types.optional(UiStore, {} as any),
});

// // initialize values
export const rootStore = RootStore.create({
  authStore: {},
  userStore: {},
  uiStore: {},
});

// store snapShot
if (__DEV__) {
  onSnapshot(rootStore, (snap) => {
    console.log('rootStore::', snap);
  });
}

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
