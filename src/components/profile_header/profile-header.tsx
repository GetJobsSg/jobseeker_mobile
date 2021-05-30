import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';
import { Icon, Text } from '..';
import {
  AVATAR,
  PROFILE_CONTAINER,
  USERINFO_WRAPPER,
  USERNAME,
  STATISTIC_WRAPPER,
  STATISTIC_INFO_LABEL,
  STATISTIC_INFO_VALUE,
} from './profile-header.styles';

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

const ProfileHeader = () => (
  <View style={PROFILE_CONTAINER}>
    <View style={USERINFO_WRAPPER}>
      <TouchableWithoutFeedback onPress={() => console.log('edit profile...')}>
        <View style={{ flex: 0.95 }}>
          <Text style={USERNAME} numberOfLines={3} preset="title1">
            Benson Toh
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.md }}>
            <Icon size={18} style={{ marginRight: 10 }} icon="ic_edit_profile" />
            <Text
              style={{
                color: colors.primaryLight,
                fontWeight: '600',
                fontSize: fontSize.xs,
                textDecorationLine: 'underline',
              }}
            >
              Edit Worker Profile
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={AVATAR} />
    </View>

    <View style={STATISTIC_WRAPPER}>
      <StatisticInfo label="Ratings" value={4.5} />
      <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
      <StatisticInfo label="No Show" value={1} />
      <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
      <StatisticInfo label="Completed" value={10} />
      <View style={{ width: 1, backgroundColor: colors.lightGrey1 }} />
      <StatisticInfo label="Work Hours" value={999.5} />
    </View>

    <View style={{ height: 1, backgroundColor: colors.lightGrey1 }} />
  </View>
);

export default ProfileHeader;
