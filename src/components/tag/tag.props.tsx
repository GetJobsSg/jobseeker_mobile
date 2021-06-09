import { ViewStyle } from 'react-native';
import { TagPresets } from './tag.presets';

export interface TagProps {
  label: string;
  preset?: TagPresets;
  children?: React.ReactNode;
  style?: ViewStyle;
}
