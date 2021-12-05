import React from 'react';
import { View, ViewStyle } from 'react-native';
import { spacing } from '../../../themes';
import { commonStyles } from '../../../common';
import { Text } from '../../../components';

const CONTAINER = {
  ...commonStyles.CONTAINER,
  paddingVertical: spacing.lg,
} as ViewStyle;

interface SectionTextContentProps {
  sectionTitle: string;
  text: string;
}

const SectionTextContent = (props: SectionTextContentProps) => {
  const { sectionTitle, text } = props;
  if (!text) return null;
  return (
    <View style={CONTAINER}>
      <Text preset="title2" style={{ marginBottom: spacing.sm }}>
        {sectionTitle}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default SectionTextContent;
