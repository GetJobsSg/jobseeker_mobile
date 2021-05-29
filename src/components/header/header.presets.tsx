import { ViewStyle } from 'react-native';
import { BASE, ROW } from './header.styles';

export const presets = {
  default: {
    container: {
      ...BASE,
    } as ViewStyle,

    leftContainer: {
      ...ROW,
    } as ViewStyle,

    rightContainer: {
      ...ROW,
    } as ViewStyle,
  },
};

export type HeaderPresets = keyof typeof presets;
