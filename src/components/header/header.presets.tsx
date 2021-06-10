import { TextStyle, ViewStyle } from 'react-native';

const ROW_CENTER = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
} as ViewStyle;

export const presets = {
  default: {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
    } as ViewStyle,

    title: {
      fontWeight: 'bold',
    } as TextStyle,

    leftContainer: {
      ...ROW_CENTER,
      minWidth: 40,
      height: '100%',
    } as ViewStyle,

    textContainer: {
      ...ROW_CENTER,
      justifyContent: 'center',
      height: '100%',
      flex: 1,
    } as ViewStyle,

    rightContainer: {
      ...ROW_CENTER,
      minWidth: 40,
      height: '100%',
    } as ViewStyle,
  },
};

export type HeaderPresets = keyof typeof presets;
