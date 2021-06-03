import { ViewStyle } from 'react-native';

export type RadioOption = {
  label: string;
  value: number | string;
};

export interface RadioProps {
  options: RadioOption[];
  onChange: (selected: RadioOption) => void;
  value: string | number | undefined;
  style?: ViewStyle;
  alignment?: 'vertical' | 'horizontal';
}
