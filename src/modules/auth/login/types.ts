import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthModalStackParamList } from '../types';
import { Routes } from '../../../navigator/routes';

type LoginScreenRouteProps = RouteProp<AuthModalStackParamList, Routes.authModal_login>;
type LoginScreenNavigateProps = StackNavigationProp<AuthModalStackParamList, Routes.authModal_login>;

export type LoginProps = {
  route: LoginScreenRouteProps;
  navigation: LoginScreenNavigateProps;
};

export interface LoginFormData {
  email: string;
  password: string;
}
