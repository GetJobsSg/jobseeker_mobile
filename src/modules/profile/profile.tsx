import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';

import NricScreen from './nric';
import PersonalPhotoScreen from './personal-photo';
import PersonalInfoScreen from './personal-info';
import ProfileCompletionScreen from './completion';

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.profile_completion}>
    <Stack.Screen name={Routes.profile_completion} component={ProfileCompletionScreen} />
    <Stack.Screen name={Routes.personal_photo} component={PersonalPhotoScreen} />
    <Stack.Screen name={Routes.personal_info} component={PersonalInfoScreen} />
    <Stack.Screen name={Routes.nric_info} component={NricScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
