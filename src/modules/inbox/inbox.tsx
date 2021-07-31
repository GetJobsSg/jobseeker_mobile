import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';

import InboxDetails from './details';

const Stack = createStackNavigator();

const InboxStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.inbox_details}>
    <Stack.Screen name={Routes.inbox_details} component={InboxDetails} />
  </Stack.Navigator>
);

export default InboxStack;
