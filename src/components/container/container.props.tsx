import { ViewStyle } from 'react-native';
import { ContainerPresets } from './container.presets';

export interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  preset?: ContainerPresets;
}
