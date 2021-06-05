import { ViewStyle } from 'react-native';

export type RadioOption = {
  label: string;
  value: number | string;
};

export interface RadioProps {
  label?: string;
  options: RadioOption[];
  onChange: (selected: RadioOption) => void;
  value: string | number | undefined | null;
  style?: ViewStyle;
  alignment?: 'vertical' | 'horizontal';
}
