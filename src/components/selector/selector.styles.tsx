import { TextStyle, ViewStyle } from 'react-native';
import { spacing, fontSize, colors } from '../../themes';

export const CONTAINER = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGrey1,
  marginVertical: spacing.sm,
} as ViewStyle;

export const LABEL = {
  color: colors.darkGrey0,
  fontSize: fontSize.sm,
} as TextStyle;

export const VALUE = {
  fontWeight: '600',
  marginTop: spacing.sm,
  fontSize: fontSize.sm,
} as TextStyle;

export const PLACEHOLDER = {
  ...VALUE,
  color: colors.lightGrey2,
} as TextStyle;

export const ACTION_TEXT = {
  color: colors.primaryLight,
  fontSize: fontSize.xs,
} as TextStyle;

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginBottom: spacing.sm,
};
