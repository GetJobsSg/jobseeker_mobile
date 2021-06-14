import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WalletOverviewScreen, AllTransactionScreen, TransactionDetailScreen } from './screens';
import { Routes } from '../../navigator/routes';

const Stack = createStackNavigator();

const WalletStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.wallet_overview}>
    <Stack.Screen name={Routes.wallet_overview} component={WalletOverviewScreen} />
    <Stack.Screen name={Routes.wallet_allTransaction} component={AllTransactionScreen} />
    <Stack.Screen name={Routes.wallet_transactionDetails} component={TransactionDetailScreen} />
  </Stack.Navigator>
);

export default WalletStack;
