import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const FIELD_WRAPPER: ViewStyle = {
  marginVertical: spacing.sm,
};

export const DIALING_CODE_WRAPPER: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingRight: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.lightGrey1,
};

export const DIALING_CODE_TEXT: TextStyle = {
  color: colors.lightGrey2,
  fontSize: fontSize.sm,
  fontWeight: '600',
};

export const PHONE_INPUT: TextStyle = {
  borderBottomWidth: 1,
  paddingVertical: spacing.sm,
  borderColor: colors.lightGrey1,
  fontSize: fontSize.sm,
  fontWeight: '600',
};

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginTop: spacing.xxs,
  marginBottom: spacing.sm,
};
