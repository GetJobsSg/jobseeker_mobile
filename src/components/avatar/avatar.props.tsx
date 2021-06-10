import { ImageStyle, ViewStyle } from 'react-native';

export interface AvatarProps {
  size?: number;
  uri: string | null | undefined;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}
