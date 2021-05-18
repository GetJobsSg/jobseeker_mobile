import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './bottom-tab-navigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
