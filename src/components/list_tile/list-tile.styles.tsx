import { ViewStyle } from 'react-native';
import { spacing } from '../../themes';

export const CONTAINER = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: spacing.xl,
} as ViewStyle;

export const LEFT_WRAPPER = {
  flex: 1,
  flexDirection: 'row',
  paddingRight: 30,
} as ViewStyle;

export const CONTENT = {
  justifyContent: 'center',
} as ViewStyle;
