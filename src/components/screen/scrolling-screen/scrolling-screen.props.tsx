import { ScrollViewProps } from 'react-native';

export interface IScrollingScreenProps {
  appBar?: React.ReactElement;
  children: React.ReactNode | React.ReactNode[];
  scrollViewProps?: ScrollViewProps;
}
