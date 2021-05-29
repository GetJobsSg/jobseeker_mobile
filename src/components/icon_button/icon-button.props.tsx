import { ViewStyle } from 'react-native';
import { IconTypes, IconRenderer } from '../icon/icons';

export interface IconButtonProps {
  icon: IconTypes | IconRenderer;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}
