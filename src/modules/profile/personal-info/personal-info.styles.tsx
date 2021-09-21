import { TextStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../../themes';

export const VERIFICATION_HINTS: TextStyle = {
  fontSize: fontSize.xxs,
  color: colors.warning,
  marginTop: spacing.xs,
};

export const RESEND: TextStyle = {
  color: colors.accent,
  fontSize: fontSize.xxs,
  fontWeight: '500',
  textDecorationLine: 'underline',
};
