import { ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

const BASE = {
  paddingHorizontal: spacing.lg,
  backgroundColor: colors.white,
} as ViewStyle;

export const presets = {
  /** only wrap the content */
  wrap: {
    ...BASE,
  } as ViewStyle,

  /** stretch vertically with full height */
  stretch: {
    ...BASE,
    flex: 1,
  } as ViewStyle,
};

export type ContainerPresets = keyof typeof presets;
