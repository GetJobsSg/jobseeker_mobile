import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Avatar, Text } from '..';
import ProfileHeaderPlaceholder from './profile-header-placeholder';
import {
  PROFILE_CONTAINER,
  USERINFO_WRAPPER,
  USERNAME,
  STATISTIC_WRAPPER,
  STATISTIC_INFO_LABEL,
  STATISTIC_INFO_VALUE,
  SHOW_PROFILE,
} from './profile-header.styles';
import { Routes } from '../../navigator/routes';
import { useMst } from '../../store';
import { TextPresets } from '../text/text.presets';

interface StatisticInfoProps {
  label: string;
  value: number;
}

const StatisticInfo = ({ label, value }: StatisticInfoProps) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={STATISTIC_INFO_VALUE}>{value}</Text>
    <Text style={STATISTIC_INFO_LABEL}>{label}</Text>
  </View>
);

const ProfileHeader = () => {
  const navigation = useNavigation();
  const {
    userStore: { isLoading, name, profileImg, rating, completedJobs, totalWorkHours },
  } = useMst();

  const getPreset = (): TextPresets => {
    if (name.length < 15) return 'header';
    if (name.length < 25) return 'title1';
    return 'title2';
  };

  if (isLoading) return <ProfileHeaderPlaceholder />;

  return (
    <View style={PROFILE_CONTAINER}>
      <View style={USERINFO_WRAPPER}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate(Routes.profile_stack)}>
          <View style={{ flex: 1 }}>
            <Text style={USERNAME} numberOfLines={3} preset={getPreset()}>
              {name}
            </Text>
            <Text style={SHOW_PROFILE}>View Profile</Text>
          </View>
        </TouchableWithoutFeedback>
        <Avatar uri={profileImg} placeholder={require('../../assets/images/profile-placeholder.png')} />
      </View>

      <View style={STATISTIC_WRAPPER}>
        <StatisticInfo label="Ratings" value={rating} />
        <StatisticInfo label="Completed" value={completedJobs} />
        <StatisticInfo label="Work Hours" value={totalWorkHours} />
      </View>
    </View>
  );
};

export default observer(ProfileHeader);
