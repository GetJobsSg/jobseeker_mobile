import { TextStyle } from 'react-native';
import { colors } from '../../themes';

const BASE: TextStyle = {
  fontSize: 16,
  color: colors.textPrimary,
};

export const presets = {
  header: {
    ...BASE,
    fontWeight: '700',
    fontSize: 26,
  } as TextStyle,

  default: {
    ...BASE,
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;
