import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../themes';

const BASE: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.sm + spacing.xs,
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
    normal: {
      ...BASE,
      ...BORDER,
    } as ViewStyle,
    disabled: {
      ...BASE,
      ...BORDER,
      opacity: 0.6,
    } as ViewStyle,
  },

  outlined: {
    normal: {
      ...BASE,
      ...BORDER,
      backgroundColor: colors.transparent,
    } as ViewStyle,
    disabled: {
      ...BASE,
      ...BORDER,
      backgroundColor: colors.transparent,
      opacity: 0.2,
    } as ViewStyle,
  },

  link: {
    normal: {
      ...BASE,
      backgroundColor: colors.transparent,
    } as ViewStyle,
    disabled: {
      ...BASE,
      backgroundColor: colors.transparent,
      opacity: 0.2,
    } as ViewStyle,
  },
};

export const btnTextPresets = {
  primary: {
    color: colors.white,
    fontWeight: '500',
    letterSpacing: 1.2,
  } as TextStyle,

  outlined: {
    color: colors.primary,
    fontWeight: '500',
    letterSpacing: 1.2,
  } as TextStyle,

  link: {
    color: colors.primary,
    letterSpacing: 1.2,
  } as TextStyle,
};

export type ButtonPresets = keyof typeof btnPresets;
export type ButtonTextPresets = keyof typeof btnTextPresets;
