import { TextStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

const BASE = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
  color: colors.black,
  fontWeight: '600',
  fontSize: fontSize.sm,
} as TextStyle;

export const presets = {
  default: {
    ...BASE,
  } as TextStyle,
};

export type TextFieldPresets = keyof typeof presets;
