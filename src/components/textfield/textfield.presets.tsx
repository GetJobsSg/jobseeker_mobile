import { TextStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

const BASE = {
  textDecorationColor: colors.darkBlue0,
  paddingTop: spacing.xl,
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.sm,
  marginBottom: spacing.md,
  color: colors.black,
  fontWeight: '600',
  fontSize: fontSize.xs,
} as TextStyle;

const BORDER = {
  borderWidth: 1,
  borderColor: colors.lightGrey2,
};

export const presets = {
  default: {
    ...BASE,
    ...BORDER,
  } as TextStyle,
};

export type TextFieldPresets = keyof typeof presets;
