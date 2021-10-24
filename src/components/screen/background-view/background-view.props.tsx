import { ScrollViewProps } from 'react-native';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface BackgroundViewProps {
  bgColor?: string;
  children: React.ReactNode | React.ReactNode[];
  safeAreaProps?: NativeSafeAreaViewProps;
  scrollViewProps?: ScrollViewProps;
}
