import { ViewStyle } from 'react-native';
import { colors } from '../../themes';

export const presets = {
  global: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.semiTransparent1,
  } as ViewStyle,
};

export type SpinnerPresets = keyof typeof presets;
