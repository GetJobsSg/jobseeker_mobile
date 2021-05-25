import { TextStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const FIELD_LABEL: TextStyle = {
  position: 'absolute',
  zIndex: 100,
  top: 16,
  left: 10,
  fontSize: fontSize.tiny,
  color: colors.textSecondary,
  fontWeight: '300',
  marginTop: -10,
};

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginTop: spacing.xxs,
  marginBottom: spacing.sm,
};
