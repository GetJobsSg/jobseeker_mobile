import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../themes';
import { Text } from '../../../components';
import { commonStyles } from '../../../common';

const CONTAINER = {
  ...commonStyles.CONTAINER,
  paddingVertical: spacing.lg,
} as ViewStyle;

const TITLE = {
  fontWeight: 'bold',
} as TextStyle;

const SALARY = {
  color: colors.accent,
} as TextStyle;

interface SectionTitleProps {
  title: string;
  rate: string;
  jobId?: number;
}

const SectionTitle = (props: SectionTitleProps) => {
  const { jobId, title, rate } = props;
  return (
    <View style={CONTAINER}>
      <Text preset="hint">{`JobId - ${jobId}`}</Text>
      <Text preset="title1" style={TITLE}>
        {title}
      </Text>
      <Text preset="title2" style={SALARY}>
        {rate}
      </Text>
    </View>
  );
};

export default SectionTitle;
