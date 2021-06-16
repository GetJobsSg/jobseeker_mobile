import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const CONTAINER = {
  position: 'relative',
  marginBottom: spacing.lg,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: colors.lightGrey1,
} as ViewStyle;

export const PLACEHOLDER_CONTAINER = {
  left: 0,
  top: 0,
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle;

export const PLACEHOLDER_HINT = {
  color: colors.lightGrey2,
  fontSize: fontSize.xs,
  marginTop: spacing.sm,
  maxWidth: 230,
} as TextStyle;

export const EDIT = {
  position: 'absolute',
  bottom: spacing.sm,
  right: spacing.sm,
  backgroundColor: colors.white,
  padding: spacing.sm,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: colors.lightGrey1,
} as ViewStyle;
