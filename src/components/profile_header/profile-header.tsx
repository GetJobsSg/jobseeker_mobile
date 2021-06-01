import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing } from '../../themes';
import { Icon, Text } from '..';
import {
  AVATAR,
  PROFILE_CONTAINER,
  USERINFO_WRAPPER,
  USERNAME,
  TEXT_EDIT_PROFILE,
  STATISTIC_WRAPPER,
  STATISTIC_INFO_LABEL,
  STATISTIC_INFO_VALUE,
} from './profile-header.styles';
import { Routes } from '../../navigator/routes';

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
  return (
    <View style={PROFILE_CONTAINER}>
      <View style={USERINFO_WRAPPER}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(Routes.profile_stack, { screen: Routes.personal_info })}
        >
          <View style={{ flex: 1 }}>
            <Text style={USERNAME} numberOfLines={3} preset="header">
              Benson Toh Ban Soon
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm }}>
              <Icon size={18} style={{ marginRight: 10 }} icon="ic_edit_profile" />
              <Text style={TEXT_EDIT_PROFILE}>Edit Profile</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={AVATAR} />
      </View>

      <View style={STATISTIC_WRAPPER}>
        <StatisticInfo label="Ratings" value={4.5} />
        <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
        <StatisticInfo label="Completed" value={10} />
        <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
        <StatisticInfo label="Work Hours" value={999.5} />
      </View>

      <View style={{ height: 1, backgroundColor: colors.lightGrey1 }} />
    </View>
  );
};

export default ProfileHeader;
