import { ViewStyle } from 'react-native';
import { spacing } from '../../themes';

export const BASE = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 45,
  marginBottom: spacing.lg,
} as ViewStyle;

export const ROW = {
  display: 'flex',
  flexDirection: 'row',
} as ViewStyle;
