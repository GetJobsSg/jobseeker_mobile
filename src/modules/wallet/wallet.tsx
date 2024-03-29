import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  WalletOverviewScreen,
  TransactionDetailScreen,
  WithdrawalScreen,
  AddEditBankAccountScreen,
  BankAccountDetailScreen,
} from './screens';
import { Routes } from '../../navigator/routes';

const Stack = createStackNavigator();

const WalletStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.wallet_overview}>
    <Stack.Screen name={Routes.wallet_overview} component={WalletOverviewScreen} />
    <Stack.Screen name={Routes.wallet_transactionDetails} component={TransactionDetailScreen} />
    <Stack.Screen name={Routes.wallet_withdrawal} component={WithdrawalScreen} />
    <Stack.Screen name={Routes.wallet_bank_accountDetails} component={BankAccountDetailScreen} />
    <Stack.Screen name={Routes.wallet_add_edit_bank_account} component={AddEditBankAccountScreen} />
  </Stack.Navigator>
);

export default WalletStack;
