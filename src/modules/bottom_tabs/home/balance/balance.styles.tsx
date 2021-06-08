import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../../../themes';

const BORDER_RADIUS = {
  borderRadius: 10,
} as ViewStyle;

export const BALANCE_CONTAINER = {
  position: 'absolute',
  left: 15,
  bottom: -20,
  right: 15,
  ...BORDER_RADIUS,
} as ViewStyle;

export const BALANCE_CARD_WRAPPER = {
  backgroundColor: colors.white,
  borderColor: colors.lightGrey1,
  shadowColor: colors.lightGrey2,
  shadowOpacity: 1,
  elevation: 5,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 5,
  paddingVertical: spacing.sm + spacing.xs,
  paddingHorizontal: spacing.md,
  ...BORDER_RADIUS,
} as ViewStyle;

export const BALANCE_LABEL = {
  color: colors.textSecondary,
  fontSize: fontSize.xxs,
} as TextStyle;
