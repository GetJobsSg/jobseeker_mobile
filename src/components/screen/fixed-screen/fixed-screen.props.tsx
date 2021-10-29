import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface IFixedScreenProps {
  children: React.ReactNode | React.ReactNode[];
  appBar?: React.ReactElement;
  safeAreaProps?: NativeSafeAreaViewProps;
  px?: number;
}
