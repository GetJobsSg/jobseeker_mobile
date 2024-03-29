interface FieldError {
  shown: boolean | undefined | string; // pattern to typing from formik
  message: string | undefined; // pattern to typing from formik
}

export interface SelectorProps {
  actionLabel?: string;
  children?: React.ReactElement;
  disabled?: boolean;
  error?: FieldError;
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
}
