import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const PROFILE_CONTAINER = {
  backgroundColor: colors.white,
  paddingVertical: spacing.lg,
} as ViewStyle;

export const USERINFO_WRAPPER = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
} as ViewStyle;

export const USERNAME = {
  color: colors.black,
  marginRight: spacing.xs,
} as TextStyle;

export const AVATAR = {
  flexShrink: 0,
  borderRadius: 65,
  width: 65,
  height: 65,
  backgroundColor: colors.lightGrey1,
} as ViewStyle;

export const STATISTIC_WRAPPER = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginTop: 25,
  marginBottom: 25,
} as ViewStyle;

export const STATISTIC_INFO_VALUE = {
  color: colors.primaryLight,
  fontWeight: 'bold',
} as TextStyle;

export const STATISTIC_INFO_LABEL = {
  color: colors.black,
  fontSize: fontSize.xxs,
  marginTop: spacing.xs,
} as TextStyle;
