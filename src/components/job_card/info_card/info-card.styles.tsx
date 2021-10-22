import { TextStyle, ViewStyle, Platform } from 'react-native';
import { colors, fontSize, spacing } from '../../../themes';

export const CONTAINER_WRAPPER = {
  marginTop: spacing.sm,
  marginBottom: spacing.sm,
} as ViewStyle;

export const BORDER_RADIUS = {
  borderRadius: 6,
};

export const CARD_CONTAINER = {
  ...BORDER_RADIUS,
  backgroundColor: colors.white,
  borderWidth: 0.2,
  borderColor: colors.lightGrey1,
  shadowColor: Platform.OS === 'ios' ? colors.lightGrey1 : colors.black,
  shadowOpacity: 1,
  elevation: 2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 5,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
} as ViewStyle;

export const CARD_TITLE = {
  fontWeight: 'bold',
  fontSize: fontSize.md,
} as TextStyle;

export const CARD_COMPANY = {
  fontSize: fontSize.xs,
  color: colors.textSecondary,
} as TextStyle;

export const CARD_LOCATION = {
  fontSize: fontSize.xs,
  paddingVertical: spacing.sm,
} as TextStyle;

export const CARD_AMOUNT = {
  fontWeight: 'bold',
  fontSize: fontSize.md,
  color: colors.accent,
} as TextStyle;
