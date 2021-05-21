import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthModalStackParamList } from '../types';

type RouteName = 'authModal.register';

type RegisterScreenRouteProps = RouteProp<AuthModalStackParamList, RouteName>;
type RegisterScreenNavigateProps = StackNavigationProp<AuthModalStackParamList, RouteName>;

export type RegisterProps = {
  route: RegisterScreenRouteProps;
  navigation: RegisterScreenNavigateProps;
};
