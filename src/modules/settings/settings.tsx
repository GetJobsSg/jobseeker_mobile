import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrivacyPolicyScreen from './privacy-policy';
import TermOfUseScreen from './term-of-use';
import SettingListScreen from './setting-list';
import { Routes } from '../../navigator/routes';

const Stack = createStackNavigator();

const WalletStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.wallet_overview}>
    <Stack.Screen name={Routes.settingsList} component={SettingListScreen} />
    <Stack.Screen name={Routes.privacyPolicy} component={PrivacyPolicyScreen} />
    <Stack.Screen name={Routes.termOfUse} component={TermOfUseScreen} />
  </Stack.Navigator>
);

export default WalletStack;
