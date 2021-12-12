import { ViewStyle } from 'react-native';
import { colors } from '../../../themes';
import { commonStyles } from '../../../common';

export const MAIN_CONTAINER = {
  marginBottom: 20,
} as ViewStyle;

export const HEADER_CONTAINER = {
  paddingBottom: 60,
  marginBottom: 50,
  paddingTop: 10,
  backgroundColor: colors.primary,
} as ViewStyle;

export const FLOATING_VIEW = {
  ...commonStyles.SAFE_PADDING,
  position: 'absolute',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  bottom: 0,
  width: '100%',
} as ViewStyle;
