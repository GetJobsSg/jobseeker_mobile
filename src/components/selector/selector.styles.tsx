import { TextStyle, ViewStyle } from 'react-native';
import { spacing, fontSize, colors } from '../../themes';

export const CONTAINER = {
  paddingVertical: spacing.md,
} as ViewStyle;

export const LABEL = {
  color: colors.darkGrey0,
  fontSize: fontSize.sm,
} as TextStyle;

export const VALUE = {
  fontWeight: '600',
  marginTop: spacing.xs,
  fontSize: fontSize.md,
} as TextStyle;

export const PLACEHOLDER = {
  ...VALUE,
  color: colors.lightGrey2,
} as TextStyle;

export const EDIT = {
  color: colors.primaryLight,
  fontSize: fontSize.sm,
} as TextStyle;

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginBottom: spacing.sm,
};
