import { Instance, SnapshotOut, types, flow } from 'mobx-state-tree';
import * as apis from '../apis';
import { withErrorHandler } from './extensions/errorsHandler';

export const userInitialState = {
  profileImg: null,
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
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    mobile: types.optional(types.string, ''),
    nric: types.optional(types.string, ''),
    verified: types.optional(types.boolean, false),
    gender: types.maybeNull(types.number),
    rating: types.optional(types.number, 0),
    completedJobs: types.optional(types.number, 0),
    totalWorkHours: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
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
    getUser: flow(function* getUser() {
      try {
        self.isLoading = true;
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
