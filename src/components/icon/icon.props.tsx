import { ViewStyle, ImageStyle, StyleProp } from 'react-native';
import { IconTypes, IconRenderer } from './icons';

export interface IconProps {
  /** style override for the icon container */
  containerStyle?: ViewStyle;

  /** name of the icon */
  icon: IconTypes | IconRenderer;

  /** size of the icon */
  size?: number;

  /** style override for the icon image */
  style?: StyleProp<ImageStyle>;
}
