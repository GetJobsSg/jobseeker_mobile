import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';
import { commonStyles } from '../../common';

export const PROFILE_CONTAINER = {
  ...commonStyles.SAFE_PADDING,
  backgroundColor: colors.primary,
  paddingTop: spacing.lg,
  marginBottom: spacing.sm,
} as ViewStyle;

export const USERINFO_WRAPPER = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
} as ViewStyle;

export const USERNAME = {
  color: colors.white,
  marginRight: spacing.xs,
  marginTop: spacing.none,
  marginBottom: spacing.none,
} as TextStyle;

export const SHOW_PROFILE = {
  color: colors.white,
  fontSize: fontSize.xs,
  marginTop: spacing.sm,
  textDecorationLine: 'underline',
} as TextStyle;

export const STATISTIC_WRAPPER = {
  justifyContent: 'space-around',
  flexDirection: 'row',
  marginTop: 25,
  marginBottom: 25,
} as ViewStyle;

export const STATISTIC_INFO_VALUE = {
  color: colors.white,
  fontWeight: 'bold',
} as TextStyle;

export const STATISTIC_INFO_LABEL = {
  color: colors.white,
  fontSize: fontSize.xxs,
  marginTop: spacing.xs,
} as TextStyle;

export const PLACEHOLDER_LINE1 = {
  height: 25,
  width: 100,
  backgroundColor: colors.lightGrey1,
  borderRadius: 10,
} as ViewStyle;

export const PLACEHOLDER_LINE2 = {
  ...PLACEHOLDER_LINE1,
  width: 120,
  height: 20,
  marginTop: spacing.md,
} as ViewStyle;

export const PLACEHOLDER_LINE3 = {
  ...PLACEHOLDER_LINE1,
  height: 20,
  width: 80,
} as ViewStyle;

export const PLACEHOLDER_AVATAR = {
  width: 60,
  height: 60,
  borderRadius: 60,
  backgroundColor: colors.lightGrey1,
} as ViewStyle;
