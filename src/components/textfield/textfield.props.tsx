import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldPresets } from './textfield.presets';

interface FieldError {
  shown: boolean | undefined | string; // follow formik typing
  message: string | undefined; // follow formik typing
}
export interface TextFieldProps extends TextInputProps {
  error?: FieldError;
  label: string;
  value: string;
  editable?: boolean;
  onChangeText: (t: string) => void;
  preset?: TextFieldPresets;
  style?: StyleProp<ViewStyle>;
}
