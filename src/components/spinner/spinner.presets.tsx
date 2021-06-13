import { ViewStyle } from 'react-native';
import { colors } from '../../themes';

const CENTER = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle;

export const presets = {
  center: {
    ...CENTER,
    flex: 1,
  },
  global: {
    ...CENTER,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.semiTransparent1,
  } as ViewStyle,
};

export type SpinnerPresets = keyof typeof presets;
