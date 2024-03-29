import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import BottomTabNavigator from './bottom-tab-navigator';
import { AuthStack } from '../modules/auth';
import { WalletStack } from '../modules/wallet';
import { ProfileStack } from '../modules/profile';
import { SettingStack } from '../modules/settings';
import { JobStack } from '../modules/job';
import { InboxStack } from '../modules/inbox';
import { CompanyStack } from '../modules/company';

import { RootParams } from './types';
import { Routes } from './routes';
import { linking } from './deepLinkConfig';

const RootStack = createStackNavigator<RootParams>();

const RootNavigator = () => (
  <NavigationContainer linking={linking}>
    <RootStack.Navigator
      initialRouteName={Routes.bottom_tabs_stack}
      mode="modal"
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <RootStack.Screen name={Routes.bottom_tabs_stack} component={BottomTabNavigator} />
      <RootStack.Screen name={Routes.auth_modal_stack} component={AuthStack} options={{ animationEnabled: true }} />
      <RootStack.Screen name={Routes.wallet_stack} component={WalletStack} />
      <RootStack.Screen name={Routes.profile_stack} component={ProfileStack} />
      <RootStack.Screen name={Routes.settings_stack} component={SettingStack} />
      <RootStack.Screen name={Routes.job_stack} component={JobStack} />
      <RootStack.Screen name={Routes.inbox_stack} component={InboxStack} />
      <RootStack.Screen name={Routes.company_stack} component={CompanyStack} />
    </RootStack.Navigator>

    <Toast ref={(ref) => Toast.setRef(ref)} />
  </NavigationContainer>
);

export default RootNavigator;
