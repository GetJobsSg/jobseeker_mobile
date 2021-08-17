import { TextStyle, ViewStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../themes';

export const RADIO_GROUP_CONTAINER = {
  display: 'flex',
  flexWrap: 'wrap',
} as ViewStyle;

export const RADIO_CONTAINER = {
  flexDirection: 'row',
  paddingVertical: spacing.sm,
  flex: 1,
  // marginRight: spacing.xl,
  marginBottom: spacing.sm,
} as ViewStyle;

export const RADIO_THUMB = {
  width: 20,
  height: 20,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.black,
  marginRight: spacing.sm,
} as ViewStyle;

export const SELECTED_RADIO_THUMB = {
  ...RADIO_THUMB,
  borderWidth: 5,
} as ViewStyle;

export const RADIO_LABEL = {
  fontWeight: '300',
} as TextStyle;

export const SELECTED_RADIO_LABEL = {
  ...RADIO_LABEL,
  fontWeight: '500',
} as TextStyle;

export const ERROR_HINTS: TextStyle = {
  color: colors.textDanger,
  fontSize: fontSize.xxs,
  marginBottom: spacing.sm,
};
