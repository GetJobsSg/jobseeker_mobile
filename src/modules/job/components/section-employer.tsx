import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../themes';
import { Text, Row, Touchable, Avatar, Icon } from '../../../components';
import { commonStyles } from '../../../common';

const CONTAINER = {
  ...commonStyles.CONTAINER,
  paddingVertical: spacing.lg,
  borderTopWidth: 1,
  borderTopColor: colors.lightGrey1,
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGrey1,
} as ViewStyle;

const COMPANY_NAME = {
  flex: 1,
  marginLeft: 10,
} as TextStyle;

interface SectionEmployerProps {
  companyName: string;
  companyLogo?: string;
  onPress: () => void;
}

const SectionEmployer = (props: SectionEmployerProps) => {
  const { companyName, companyLogo, onPress } = props;
  return (
    <Touchable underlayColor={colors.lightGrey0} onPress={onPress} style={CONTAINER}>
      <Row>
        <Row style={{ flex: 1 }}>
          <Avatar uri={companyLogo} size={50} />
          <Text style={COMPANY_NAME} numberOfLines={2} preset="title3">
            {companyName}
          </Text>
        </Row>
        <Icon icon="ic_arrow_right" />
      </Row>
    </Touchable>
  );
};

export default SectionEmployer;
