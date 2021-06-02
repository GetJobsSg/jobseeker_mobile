import { Instance, SnapshotOut, types, flow } from 'mobx-state-tree';
import * as apis from '../apis';
import { withErrorHandler } from './extensions/errorsHandler';

export const userInitialState = {
  profileImg: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  nric: '',
  verified: false,
  gender: null,
  rating: 0,
  completedJobs: 0,
  totalWorkHours: 0,
  isLoading: false,
  error: '',
};

export const UserStore = types
  .model('UserStore')
  .props({
    profileImg: types.maybeNull(types.string),
    firstName: types.string,
    lastName: types.string,
    email: types.string,
    mobile: types.string,
    nric: types.string,
    verified: types.boolean,
    gender: types.maybeNull(types.number),
    rating: types.number,
    completedJobs: types.number,
    totalWorkHours: types.number,
    isLoading: types.boolean,
    error: types.string,
  })
  .views((self) => ({
    get name() {
      return `${self.firstName} ${self.lastName}`;
    },
  }))
  .extend(withErrorHandler)
  .actions((self) => ({
    transformToState: (data: any) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { profile, job_statistics } = data;
      self.profileImg = profile.profile_img || '';
      self.firstName = profile.first_name || '';
      self.lastName = profile.last_name || '';
      self.email = profile.email || '';
      self.mobile = profile.mobile || '';
      self.nric = profile.nric_no || '';
      self.verified = profile.verified || false;
      self.gender = profile.gender?.id || null;
      self.rating = job_statistics.rating;
      self.completedJobs = job_statistics.completed_jobs;
      self.totalWorkHours = job_statistics.total_work_hours;
    },
  }))
  .actions((self) => ({
    setUser: () => {},
    getUser: flow(function* getUser() {
      self.isLoading = true;
      try {
        const { data: resp } = yield apis.getProfile();
        self.transformToState(resp);
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type UserStoreInstance = Instance<typeof UserStore>;
export interface UserSto extends UserStoreInstance {}

type UserStoreSnapshotType = SnapshotOut<typeof UserStore>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
