import { TextInputProps } from 'react-native';

interface FieldError {
  shown: boolean | undefined | string; // follow formik typing
  message: string | undefined; // follow formik typing
}

export interface PhoneInputProps extends TextInputProps {
  dialingCode: string;
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  error?: FieldError;
}
