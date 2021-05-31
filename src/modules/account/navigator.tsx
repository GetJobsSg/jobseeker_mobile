import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainAccount from './main';
import Wallet from './wallet';
import Preferences from './preferences';
import Settings from './settings';
import Profile from './profile';

import { AccountParamList } from './types';

const Stack = createStackNavigator<AccountParamList>();

export const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="account.main" component={MainAccount} />
    <Stack.Screen name="account.profile" component={Profile} />
    <Stack.Screen name="account.wallet" component={Wallet} />
    <Stack.Screen name="account.preferences" component={Preferences} />
    <Stack.Screen name="account.settings" component={Settings} />
  </Stack.Navigator>
);
