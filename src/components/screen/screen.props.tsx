import { RefreshControlProps } from 'react-native';

export interface ScreenProps {
  children: React.ReactNode;
  preset?: 'scroll' | 'fixed';
  refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>> | undefined;
}
