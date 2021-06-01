import { RefreshControlProps } from 'react-native';

/** For iPhone >=10, we need to allocate some padding on top or bottom */
type UnsafeArea = 'top' | 'bottom';

export interface ScreenProps {
  children: React.ReactNode;
  preset?: 'scroll' | 'fixed';
  refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>> | undefined;
  withContainer?: boolean;
  unsafeArea?: UnsafeArea[] | null;
  statusBar?: 'dark-content' | 'light-content';
}
