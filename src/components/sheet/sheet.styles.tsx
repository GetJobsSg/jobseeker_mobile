import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

export const CONTROLLER_BAR = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: colors.white,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.xl,
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGrey1,
} as ViewStyle;

export const CONTROLLER_OK = {
  fontWeight: '600',
  color: colors.primaryLight,
} as TextStyle;
