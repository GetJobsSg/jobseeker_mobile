import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const FIELD_WRAPPER: ViewStyle = {
  marginVertical: spacing.md,
};

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginTop: spacing.xxs,
  marginBottom: spacing.sm,
};
