import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../themes';

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
