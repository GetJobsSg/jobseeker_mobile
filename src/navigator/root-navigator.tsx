import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import BottomTabNavigator from './bottom-tab-navigator';
import { AuthStack } from '../modules/auth';
import { WalletStack } from '../modules/wallet';
import { ProfileStack } from '../modules/profile';
import { SettingStack } from '../modules/settings';

import { RootParams } from './types';
import { Routes } from './routes';

const RootStack = createStackNavigator<RootParams>();

const RootNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator mode="modal" headerMode="none" screenOptions={{ animationEnabled: false }}>
      <RootStack.Screen name={Routes.bottom_tabs_stack} component={BottomTabNavigator} />
      <RootStack.Screen name={Routes.auth_modal_stack} component={AuthStack} options={{ animationEnabled: true }} />
      <RootStack.Screen name={Routes.wallet_stack} component={WalletStack} />
      <RootStack.Screen name={Routes.profile_stack} component={ProfileStack} />
      <RootStack.Screen name={Routes.settings_stack} component={SettingStack} />
    </RootStack.Navigator>

    {/* Warning: toast must place at the bottom */}
    <Toast ref={(ref) => Toast.setRef(ref)} />
    {/* <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
      }}
    >
      <ActivityIndicator color="#000" />
    </View> */}
  </NavigationContainer>
);

export default RootNavigator;
