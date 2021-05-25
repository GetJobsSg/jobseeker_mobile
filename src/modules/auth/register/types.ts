import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthModalStackParamList } from '../types';

type RouteName = 'authModal.register';

type RegisterScreenRouteProps = RouteProp<AuthModalStackParamList, RouteName>;
type RegisterScreenNavigateProps = StackNavigationProp<AuthModalStackParamList, RouteName>;

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
