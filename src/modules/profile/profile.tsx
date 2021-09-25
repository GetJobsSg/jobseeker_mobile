import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';
import { ProfileParamList } from './types';

import NricScreen from './nric';
import PersonalPhotoScreen from './personal-photo';
import PersonalInfoScreen from './personal-info';
import ProfileCompletionScreen from './completion';
import TrainingScreen from './training';
import MobileEditScreen from './mobile-edit';
import OtpVerifyScreen from './verify';

const Stack = createStackNavigator<ProfileParamList>();

const ProfileStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName={Routes.profile_completion}>
    <Stack.Screen name={Routes.profile_completion} component={ProfileCompletionScreen} />
    <Stack.Screen name={Routes.personal_photo} component={PersonalPhotoScreen} />
    <Stack.Screen name={Routes.personal_info} component={PersonalInfoScreen} />
    <Stack.Screen name={Routes.nric_info} component={NricScreen} />
    <Stack.Screen name={Routes.training} component={TrainingScreen} />
    <Stack.Screen name={Routes.editMobile} component={MobileEditScreen} />
    <Stack.Screen name={Routes.otpVerify} component={OtpVerifyScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
