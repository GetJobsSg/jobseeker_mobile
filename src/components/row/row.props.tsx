import { ViewStyle } from 'react-native';

/** in house justify type */
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

/** in house align type */
export type Align = 'top' | 'center' | 'bottom';

export type JustifyContentType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface RowProps {
  children: React.ReactNode;
  justify?: Justify;
  align?: Align;
  wrap?: boolean;
  style?: ViewStyle;
}
