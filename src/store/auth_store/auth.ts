import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import { firebaseLogin, firebaseLogout } from '../../utils/firebase';

const initialState = {
  uid: '',
  access_token: '',
  isLoading: false,
  error: null,
};

export const AuthStore = types
  .model('AuthStore')
  .props({
    uid: types.optional(types.string, ''),
    access_token: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.model({})),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!(self.uid && self.access_token);
    },
  }))
  .actions((self) => ({
    setAuth: flow(function* setAuth(user: FirebaseAuthTypes.User | null) {
      if (user) {
        self.uid = user.uid;
        self.access_token = yield user.getIdToken();
        return;
      }
      self.uid = '';
      self.access_token = '';
    }),

    login: flow(function* login(email: string, password: string) {
      self.isLoading = true;
      yield* toGenerator(firebaseLogin(email, password));
      self.isLoading = false;

      // TODO: set error firebase error message
    }),

    logout: flow(function* logout() {
      yield* toGenerator(firebaseLogout());
    }),
  }));

// initial state
AuthStore.create(initialState);

type AuthStoreInstance = Instance<typeof AuthStore>;
export interface Auth extends AuthStoreInstance {}

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStore>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
