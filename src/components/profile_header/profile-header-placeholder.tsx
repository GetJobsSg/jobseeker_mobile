import React from 'react';
import { View } from 'react-native';
import {
  PROFILE_CONTAINER,
  USERINFO_WRAPPER,
  STATISTIC_WRAPPER,
  PLACEHOLDER_AVATAR,
  PLACEHOLDER_LINE1,
  PLACEHOLDER_LINE2,
  PLACEHOLDER_LINE3,
} from './profile-header.styles';

const ProfileHeaderPlaceHolder = () => (
  <View style={PROFILE_CONTAINER}>
    <View style={USERINFO_WRAPPER}>
      <View>
        <View style={PLACEHOLDER_LINE1} />
        <View style={PLACEHOLDER_LINE2} />
      </View>
      <View style={PLACEHOLDER_AVATAR} />
    </View>
    <View style={[STATISTIC_WRAPPER, { justifyContent: 'space-between' }]}>
      <View style={PLACEHOLDER_LINE3} />
      <View style={PLACEHOLDER_LINE3} />
      <View style={PLACEHOLDER_LINE3} />
    </View>
  </View>
);

export default ProfileHeaderPlaceHolder;
