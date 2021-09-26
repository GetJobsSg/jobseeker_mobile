import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const CONTAINER = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.xl,
} as ViewStyle;

export const TITLE = {
  color: colors.black,
  fontWeight: 'bold',
  marginBottom: spacing.xs,
} as TextStyle;

export const SUBTITLE = {
  fontSize: fontSize.xs,
  color: colors.textSecondary,
} as TextStyle;

export const ERROR_HINT = {
  color: colors.textDanger,
  fontSize: fontSize.xs,
  marginBottom: spacing.sm,
} as TextStyle;

export const CELL_ROOT = {
  justifyContent: 'flex-start',
  paddingVertical: spacing.lg,
} as ViewStyle;

export const CELL = {
  width: 50,
  height: 50,
  borderWidth: 1,
  borderColor: colors.lightGrey2,
  borderRadius: spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: spacing.sm,
} as ViewStyle;

export const CELL_FOCUSED = {
  ...CELL,
  borderWidth: 2,
  borderColor: colors.black,
} as ViewStyle;

export const CELL_TEXT = {
  color: colors.black,
  fontWeight: 'bold',
} as TextStyle;
