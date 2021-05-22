import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

const BASE: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.xl,
  backgroundColor: colors.primary,
};

const BORDER: ViewStyle = {
  borderWidth: 1.5,
  borderRadius: 4,
  borderColor: colors.primary,
};

export const btnPresets = {
  primary: {
    ...BASE,
    ...BORDER,
  } as ViewStyle,

  outlined: {
    ...BASE,
    ...BORDER,
    backgroundColor: colors.transparent,
  } as ViewStyle,
};

export const btnTextPresets = {
  primary: {
    color: colors.white,
    fontWeight: '600',
  } as TextStyle,

  outlined: {
    color: colors.primary,
    fontWeight: '600',
  } as TextStyle,
};

export type ButtonPresets = keyof typeof btnPresets;
export type ButtonTextPresets = keyof typeof btnTextPresets;