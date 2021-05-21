import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthModalStackParamList } from '../types';

type LoginRouteName = 'authModal.login';

type LoginScreenRouteProps = RouteProp<AuthModalStackParamList, LoginRouteName>;
type LoginScreenNavigateProps = StackNavigationProp<AuthModalStackParamList, LoginRouteName>;

export type LoginProps = {
  route: LoginScreenRouteProps;
  navigation: LoginScreenNavigateProps;
};
