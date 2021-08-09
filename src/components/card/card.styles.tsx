import { ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

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
  shadowColor: colors.black,
  shadowOpacity: 1,
  elevation: 2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 5,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
} as ViewStyle;
