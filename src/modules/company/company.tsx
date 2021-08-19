import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CompanyDetailsScreen } from './screens';
import { Routes } from '../../navigator/routes';

const Stack = createStackNavigator();

const CompanyStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.company_details}>
    <Stack.Screen name={Routes.company_details} component={CompanyDetailsScreen} />
  </Stack.Navigator>
);

export default CompanyStack;
