import { ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

const BASE = {
  backgroundColor: colors.white,
  flex: 1,
  height: '100%',
  width: '100%',
} as ViewStyle;

export const presets = {
  scroll: {
    outer: { ...BASE } as ViewStyle,
    inner: {
      ...BASE,
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
  },
  fixed: {
    outer: { ...BASE } as ViewStyle,
    inner: {
      ...BASE,
      paddingHorizontal: spacing.lg,
    } as ViewStyle,
  },
};

export type ScreenPresets = keyof typeof presets;
