import { Instance, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
import { AuthStore } from '../auth';
import { UserStore } from '../user';

export const RootStore = types.model('RootStore').props({
  authStore: AuthStore,
  userStore: UserStore,
});

// // initialize values
export const rootStore = RootStore.create({
  authStore: {},
  userStore: {},
  // homeStore: homeInitialState,
  // completedJobStore: completedJobsInitialState
  // upcomingJobStore: upcomingJobsInitialState
  // onGoingJobStore: onGoingJobStoreState
  // appliedJobStore: appliedJobStoreState
  // jobInfoStore: jobInfoInitialState
});

// store snapShot
if (__DEV__) {
  onSnapshot(rootStore, (snap) => {
    console.log('rootStore::', snap);
  });
}

export interface RootStoreInstance extends Instance<typeof RootStore> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStore> {}
