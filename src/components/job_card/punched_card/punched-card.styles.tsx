import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../themes';

export const CLOCK_IN_OUT_DETAILS = {
  marginTop: spacing.md,
} as ViewStyle;

export const TIME = {
  fontWeight: '700',
} as TextStyle;

export const CLOCKING_BUTTON = {
  borderColor: colors.lightGrey2,
  borderWidth: 1,
  marginTop: spacing.xl + spacing.xl,
} as ViewStyle;

export const CLOCKING_BUTTON_TEXT = {
  fontWeight: 'normal',
  color: colors.black,
} as TextStyle;
