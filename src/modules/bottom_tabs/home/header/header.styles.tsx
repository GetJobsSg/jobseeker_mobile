import { TextStyle, ViewStyle } from 'react-native';
import { commonStyles } from '../../../../common';
import { colors, spacing } from '../../../../themes';

export const HEADER_CONTAINER = {
  height: 140,
  backgroundColor: colors.primary,
  position: 'relative',
  ...commonStyles.CONTAINER,
} as ViewStyle;

export const WELCOME_WRAPPER = {
  paddingTop: spacing.lg,
} as TextStyle;

export const WELCOME = {
  color: colors.white,
} as TextStyle;

export const NAME = {
  color: colors.white,
  marginTop: 0,
} as TextStyle;
