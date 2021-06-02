import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import { firebaseLogin, firebaseLogout } from '../utils/firebase';
import * as apis from '../apis';
import { FormDataTypeOmit } from '../modules/auth/register/types';
import { withErrorHandler } from './extensions/errorsHandler';
import { setItem, removeItem, StorageKey } from '../utils/storage';

export const authInitialState = {
  uid: '',
  access_token: '',
  isLoadingLogin: false,
  isLoadingLogout: false,
  isLoadingRegister: false,
  error: '',
  test: '',
};

export const AuthStore = types
  .model('AuthStore')
  .props({
    uid: types.string,
    access_token: types.string,
    isLoadingLogin: types.boolean,
    isLoadingLogout: types.boolean,
    isLoadingRegister: types.boolean,
    error: types.string,
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!(self.uid && self.access_token);
    },
  }))
  .extend(withErrorHandler)
  .actions((self) => ({
    setAuth: flow(function* setAuth(user: FirebaseAuthTypes.User | null) {
      // user is logged in
      if (user) {
        const accessToken = yield user.getIdToken();
        self.uid = user.uid;
        self.access_token = accessToken;
        setItem(StorageKey.ACCESS_TOKEN, accessToken);
        return;
      }

      // user not logged in, clear store and storages
      removeItem(StorageKey.ACCESS_TOKEN);
      self.uid = '';
      self.access_token = '';
    }),

    register: flow(function* register(data: FormDataTypeOmit) {
      const transformed = { ...data, first_name: data.firstName, last_name: data.lastName };
      try {
        self.error = '';
        self.isLoadingRegister = true;
        yield* toGenerator(apis.registerUser(transformed));
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

type AuthStoreInstance = Instance<typeof AuthStore>;
export interface Auth extends AuthStoreInstance {}

type AuthStoreSnapshotType = SnapshotOut<typeof AuthStore>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
