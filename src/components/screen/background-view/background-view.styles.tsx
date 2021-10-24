import { ViewStyle } from 'react-native';
import { colors } from '../../../themes';

export const BG_VIEW_CONTAINER = {
  flex: 1,
  backgroundColor: colors.white,
  position: 'relative',
} as ViewStyle;

export const TOP_BG_LAYER = {
  position: 'absolute',
  width: '100%',
  height: '50%',
  top: 0,
} as ViewStyle;
