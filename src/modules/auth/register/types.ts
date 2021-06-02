import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthModalStackParamList } from '../types';
import { Routes } from '../../../navigator/routes';

type RegisterScreenRouteProps = RouteProp<AuthModalStackParamList, Routes.authModal_register>;
type RegisterScreenNavigateProps = StackNavigationProp<AuthModalStackParamList, Routes.authModal_register>;

export interface RegisterFormData {
  email: string;
  password: string;
  cPassword: string;
  firstName: string;
  lastName: string;
}

export type FormDataTypeOmit = Omit<RegisterFormData, 'cPassword'>;

export type RegisterProps = {
  route: RegisterScreenRouteProps;
  navigation: RegisterScreenNavigateProps;
};
