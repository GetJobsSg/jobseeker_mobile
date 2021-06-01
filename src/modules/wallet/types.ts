import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';

type WalletParamsList = {
  [Routes.wallet_overview]: undefined;
  [Routes.wallet_allTransaction]: undefined;
  [Routes.wallet_transactionDetails]: undefined;
};

export type WalletNavigationProp = StackNavigationProp<WalletParamsList, Routes.wallet_overview>;
export type WalletRouteProps = RouteProp<WalletParamsList, Routes.wallet_overview>;

export type WalletScreenProps = {
  navigation: WalletNavigationProp;
  route: WalletRouteProps;
};
