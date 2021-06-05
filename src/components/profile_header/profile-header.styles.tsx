import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const PROFILE_CONTAINER = {
  backgroundColor: colors.white,
  paddingTop: spacing.lg,
  marginBottom: spacing.xl,
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
  marginTop: spacing.none,
  marginBottom: spacing.none,
} as TextStyle;

export const SHOW_PROFILE = {
  color: colors.primaryLight,
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
  color: colors.primaryLight,
  fontWeight: 'bold',
} as TextStyle;

export const STATISTIC_INFO_LABEL = {
  color: colors.black,
  fontSize: fontSize.xxs,
  marginTop: spacing.xs,
} as TextStyle;
