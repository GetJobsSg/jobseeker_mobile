import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';
import JobDetails from './details';
import { JobParamsList } from './types';

const Stack = createStackNavigator<JobParamsList>();

const JobStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.job_details}>
    <Stack.Screen name={Routes.job_details} component={JobDetails} />
  </Stack.Navigator>
);

export default JobStack;
