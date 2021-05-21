import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldPresets } from './textfield.presets';

export interface TextFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  preset?: TextFieldPresets;
  style?: StyleProp<ViewStyle>;
}
