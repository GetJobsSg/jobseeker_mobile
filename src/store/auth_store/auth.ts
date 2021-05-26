import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import { firebaseLogin, firebaseLogout } from '../../utils/firebase';
import { registerUser } from '../../apis';
import { FormDataTypeOmit } from '../../modules/auth/register/types';
import { withErrorHandler } from '../extensions/errorsHandler';

const initialState = {
  uid: '',
  access_token: '',
  isLoadingLogin: false,
  isLoadingLogout: false,
  isLoadingRegister: false,
  error: '',
};

export const AuthStore = types
  .model('AuthStore')
  .props({
    uid: types.optional(types.string, ''),
    access_token: types.optional(types.string, ''),
    isLoadingLogin: types.optional(types.boolean, false),
    isLoadingLogout: types.optional(types.boolean, false),
    isLoadingRegister: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!(self.uid && self.access_token);
    },
  }))
  .extend(withErrorHandler)
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
      const transformed = { ...data, first_name: data.firstName, last_name: data.lastName };
      try {
        self.error = '';
        self.isLoadingRegister = true;
        yield* toGenerator(registerUser(transformed));
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoadingRegister = false;
      }
    }),

    login: flow(function* login(email: string, password: string) {
      try {
        self.error = '';
        self.isLoadingLogin = true;
        yield* toGenerator(firebaseLogin(email, password));
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoadingLogin = false;
      }
    }),

    logout: flow(function* logout() {
      try {
        self.error = '';
        self.isLoadingLogout = true;
        yield* toGenerator(firebaseLogout());
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoadingLogout = false;
      }
    }),
  }));

// authStore initial state
export const authInitialState = AuthStore.create(initialState);

type AuthStoreInstance = Instance<typeof AuthStore>;
export interface Auth extends AuthStoreInstance {}

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStore>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
