import { Routes } from '../../navigator/routes';

export type AuthModalStackParamList = {
  [Routes.authModal_login]: { prevScreen: string } | undefined;
  [Routes.authModal_register]: { prevScreen: string } | undefined;
};
