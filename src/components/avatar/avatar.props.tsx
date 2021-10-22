import { ImageStyle, ViewStyle, ImageRequireSource } from 'react-native';

export interface AvatarProps {
  size?: number;
  uri: string | null | undefined;
  placeholder?: ImageRequireSource;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}
