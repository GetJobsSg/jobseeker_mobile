import { ViewStyle } from 'react-native';
import { colors, spacing } from '../themes';

const CONTAINER: ViewStyle = {
  padding: spacing.md,
};

const FULL: ViewStyle = {
  flex: 1,
};

const CENTER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const ROW: ViewStyle = {
  flexDirection: 'row',
};

const STICKY_BOTTOM: ViewStyle = {
  backgroundColor: colors.white,
  borderTopWidth: 1,
  borderTopColor: colors.lightGrey1,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
};

const CARD_VIEW: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.lightGrey1,
  shadowColor: colors.lightGrey1,
  shadowOpacity: 1,
  elevation: 1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 2,
  paddingVertical: spacing.sm + spacing.xs,
  paddingHorizontal: spacing.md,
};

export const commonStyles = {
  CONTAINER,
  CARD_VIEW,
  STICKY_BOTTOM,
  FULL,
  CENTER,
  ROW,
};
