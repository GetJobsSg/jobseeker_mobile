import { TextStyle, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../../themes';
import { commonStyles } from '../../../../common';

export const MAIN_CONTAINER = {
  marginBottom: 20,
} as ViewStyle;

export const HEADER_CONTAINER = {
  ...commonStyles.SAFE_PADDING,
  paddingBottom: 50,
  marginBottom: 35,
  paddingTop: 10,
  backgroundColor: colors.primary,
} as ViewStyle;

export const WELCOME_WRAPPER = {
  paddingTop: spacing.lg,
} as TextStyle;

export const WELCOME = {
  color: colors.white,
} as TextStyle;

export const NAME = {
  color: colors.white,
  marginTop: 0,
} as TextStyle;

export const NAME_PLACEHOLDER = {
  backgroundColor: colors.lightGrey1,
  borderRadius: 10,
  marginVertical: 10,
  height: 25,
  width: 200,
  marginBottom: spacing.lg,
} as ViewStyle;

export const FLOATING_VIEW = {
  ...commonStyles.SAFE_PADDING,
  position: 'absolute',
  alignSelf: 'center',
  bottom: 0,
  width: '100%',
} as ViewStyle;
