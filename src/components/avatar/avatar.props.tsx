import { ImageStyle, ViewStyle } from 'react-native';

export interface AvatarProps {
  size?: number;
  uri: string | null;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}
