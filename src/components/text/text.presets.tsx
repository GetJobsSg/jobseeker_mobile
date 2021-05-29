import { TextStyle } from 'react-native';
import { colors, spacing, fontSize } from '../../themes';

const BASE: TextStyle = {
  fontSize: fontSize.sm,
  color: colors.textPrimary,
};

export const presets = {
  /** Header title of the screen */
  header: {
    ...BASE,
    fontWeight: '700',
    fontSize: fontSize.xl,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  } as TextStyle,

  title1: {
    ...BASE,
    fontSize: fontSize.lg,
    fontWeight: '600',
  } as TextStyle,

  title2: {
    ...BASE,
    fontSize: fontSize.md,
    fontWeight: '600',
  } as TextStyle,

  /** A hints display */
  hint: {
    ...BASE,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  } as TextStyle,

  /** Default with fontSize:16; fontWeight: 'normal' */
  default: {
    ...BASE,
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;
