import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../themes';
import { Icon, Row, Text } from '../../../components';
import { commonStyles } from '../../../common';

const CONTAINER = {
  ...commonStyles.CONTAINER,
  paddingVertical: spacing.lg,
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGrey1,
} as ViewStyle;

interface SectionDateTimeProps {
  date: string;
  time: string;
}

const SectionDateTime = (props: SectionDateTimeProps) => {
  const { date, time } = props;
  return (
    <View style={CONTAINER}>
      <Row style={{ marginBottom: 10 }}>
        <Icon icon="calendar" style={{ marginRight: 10 }} />
        <Text preset="title3">{date}</Text>
      </Row>
      <Row>
        <Icon icon="clock" style={{ marginRight: 10 }} />
        <Text preset="title3">{time}</Text>
      </Row>
    </View>
  );
};

export default SectionDateTime;
