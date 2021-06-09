import { ViewStyle } from 'react-native';

export interface TouchableProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}
