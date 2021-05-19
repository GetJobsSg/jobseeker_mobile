import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottom-tab-navigator';
import { AuthModalStack } from '../modules';

type RootParams = {
  bottomStack: undefined;
  authModal: undefined;
};

const RootStack = createStackNavigator<RootParams>();

const RootNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="bottomStack" component={BottomTabNavigator} />
      <RootStack.Screen name="authModal" component={AuthModalStack} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
