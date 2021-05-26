import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from './bottom-tab-navigator';
import { AuthModalStack } from '../modules';

type RootParams = {
  bottomTabStack: undefined;
  authModal: undefined;
};

const RootStack = createStackNavigator<RootParams>();

const RootNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="bottomTabStack" component={BottomTabNavigator} />
      <RootStack.Screen name="authModal" component={AuthModalStack} />
    </RootStack.Navigator>

    {/* Warning: toast must place at the bottom */}
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </NavigationContainer>
);

export default RootNavigator;
