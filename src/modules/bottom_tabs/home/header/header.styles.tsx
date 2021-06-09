import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../../themes';

export const HEADER_CONTAINER = {
  marginBottom: 30,
} as ViewStyle;

export const WELCOME_WRAPPER = {
  paddingTop: spacing.lg,
} as TextStyle;

export const WELCOME = {
  color: colors.primary,
} as TextStyle;

export const NAME = {
  color: colors.primary,
  marginTop: 0,
} as TextStyle;
