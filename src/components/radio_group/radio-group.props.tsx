import { ViewStyle } from 'react-native';

interface FieldError {
  shown: boolean | undefined | string; // pattern to typing from formik
  message: string | undefined; // pattern to typing from formik
}

export type RadioOption = {
  label: string;
  value: number | string;
};

export interface RadioProps {
  error?: FieldError;
  label?: string;
  options: RadioOption[];
  onChange: (selected: RadioOption) => void;
  value: string | number | undefined | null;
  style?: ViewStyle;
  alignment?: 'vertical' | 'horizontal';
}
