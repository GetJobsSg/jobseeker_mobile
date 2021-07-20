import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../../../themes';

const BORDER_RADIUS = {
  borderRadius: 10,
} as ViewStyle;

export const BALANCE_CONTAINER = {
  ...BORDER_RADIUS,
  shadowColor: colors.lightGrey1,
  shadowOpacity: 1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 2,
  elevation: 2,
} as ViewStyle;

export const BALANCE_CARD_WRAPPER = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.lightGrey1,
  elevation: 2,
  paddingVertical: spacing.sm + spacing.xs,
  paddingHorizontal: spacing.md,
  ...BORDER_RADIUS,
} as ViewStyle;

export const BALANCE_LABEL = {
  color: colors.textSecondary,
  fontSize: fontSize.xxs,
} as TextStyle;

export const BALANCE_PLACEHOLDER = {
  backgroundColor: colors.lightGrey1,
  borderRadius: 10,
  // marginVertical: 10,
  marginTop: spacing.sm,
  height: 20,
  width: 100,
} as ViewStyle;
