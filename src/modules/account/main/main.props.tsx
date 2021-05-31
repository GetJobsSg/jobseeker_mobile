import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountParamList } from '../types';

type AccountRouteName = 'account.main';
type AccountScreenRouteProps = RouteProp<AccountParamList, AccountRouteName>;
type AccountScreenNavigateProps = StackNavigationProp<AccountParamList, AccountRouteName>;

export type AccountProps = {
  route: AccountScreenRouteProps;
  navigation: AccountScreenNavigateProps;
};
