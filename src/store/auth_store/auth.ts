import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import { firebaseLogin, firebaseLogout } from '../../utils/firebase';
import { registerUser } from '../../apis';
import { FormDataTypeOmit } from '../../modules/auth/register/types';

const initialState: Partial<Auth> = {
  uid: '',
  access_token: '',
  isLoadingLogin: false,
  isLoadingLogout: false,
  isLoadingRegister: false,
  error: null,
};

export const AuthStore = types
  .model('AuthStore')
  .props({
    uid: types.optional(types.string, ''),
    access_token: types.optional(types.string, ''),
    isLoadingLogin: types.optional(types.boolean, false),
    isLoadingLogout: types.optional(types.boolean, false),
    isLoadingRegister: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
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

    register: flow(function* register(data: FormDataTypeOmit) {
      const transformedData = {
        ...data,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile: '90449045', // TO REMOVE THIS
      };
      try {
        self.error = null;
        self.isLoadingRegister = true;
        yield* toGenerator(registerUser(transformedData));
        self.isLoadingRegister = false;
      } catch (e) {
        self.error = e;
      }
    }),

    login: flow(function* login(email: string, password: string) {
      try {
        self.error = null;
        self.isLoadingLogin = true;
        yield* toGenerator(firebaseLogin(email, password));
        self.isLoadingLogin = false;
      } catch (e) {
        self.error = e.code;
      }
    }),

    logout: flow(function* logout() {
      try {
        self.error = null;
        self.isLoadingLogout = true;
        yield* toGenerator(firebaseLogout());
        self.isLoadingLogout = false;
      } catch (e) {
        self.error = e.code;
      }
    }),
  }));

// initial state
AuthStore.create(initialState);

type AuthStoreInstance = Instance<typeof AuthStore>;
export interface Auth extends AuthStoreInstance {}

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStore>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
