import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { colors, spacing } from '../../themes';
import { Avatar, Icon, Text } from '..';
import {
  PROFILE_CONTAINER,
  USERINFO_WRAPPER,
  USERNAME,
  TEXT_EDIT_PROFILE,
  STATISTIC_WRAPPER,
  STATISTIC_INFO_LABEL,
  STATISTIC_INFO_VALUE,
} from './profile-header.styles';
import { Routes } from '../../navigator/routes';
import { useMst } from '../../store';

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
    userStore: { name, profileImg, rating, completedJobs, totalWorkHours },
  } = useMst();

  return (
    <View style={PROFILE_CONTAINER}>
      <View style={USERINFO_WRAPPER}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(Routes.profile_stack, { screen: Routes.personal_info })}
        >
          <View style={{ flex: 1 }}>
            <Text style={USERNAME} numberOfLines={3} preset="header">
              {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
              <Icon size={18} style={{ marginRight: 10 }} icon="ic_edit_profile" />
              <Text style={TEXT_EDIT_PROFILE}>Edit Profile</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Avatar uri={profileImg} />
      </View>

      <View style={STATISTIC_WRAPPER}>
        <StatisticInfo label="Ratings" value={rating} />
        <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
        <StatisticInfo label="Completed" value={completedJobs} />
        <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
        <StatisticInfo label="Work Hours" value={totalWorkHours} />
      </View>

      <View style={{ height: 1, backgroundColor: colors.lightGrey1 }} />
    </View>
  );
};

export default observer(ProfileHeader);
