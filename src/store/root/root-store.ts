import { Instance, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore, authInitialState } from '../auth';
import { UserStore, userInitialState } from '../user';

export const RootStore = types.model('RootStore').props({
  authStore: AuthStore,
  userStore: UserStore,
});

// // initialize values
export const rootStore = RootStore.create({
  authStore: authInitialState,
  userStore: userInitialState,
});

// store snapShot
if (__DEV__) {
  onSnapshot(rootStore, (snap) => {
    console.log('rootStore::', snap);
  });
}

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
