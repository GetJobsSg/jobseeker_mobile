import { TouchableHighlightProps, TouchableNativeFeedbackProps, ViewStyle } from 'react-native';

export interface TouchableProps extends TouchableHighlightProps, TouchableNativeFeedbackProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}
