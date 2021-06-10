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

export const commonStyles = {
  CONTAINER,
  STICKY_BOTTOM,
  FULL,
  CENTER,
  ROW,
};
