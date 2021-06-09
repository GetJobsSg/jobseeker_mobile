import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

const BASE = {
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  borderRadius: 100,
  borderColor: colors.primaryLight,
  borderWidth: 1,
  marginTop: spacing.md,
  marginRight: spacing.sm,
} as ViewStyle;

export const presets = {
  primary: {
    container: {
      ...BASE,
      backgroundColor: colors.primaryLight,
    } as ViewStyle,
    text: {
      color: colors.white,
      fontSize: fontSize.xxs,
    } as TextStyle,
  },
};

export type TagPresets = keyof typeof presets;
