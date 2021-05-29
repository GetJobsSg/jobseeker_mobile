import { ViewStyle, ImageStyle } from 'react-native';
import { IconTypes, IconRenderer } from './icons';

export interface IconProps {
  /** style override for the icon container */
  containerStyle?: ViewStyle;

  /** name of the icon */
  icon: IconTypes | IconRenderer;

  /** style override for the icon image */
  style?: ImageStyle;
}
