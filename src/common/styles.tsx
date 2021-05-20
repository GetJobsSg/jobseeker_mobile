import { ViewStyle } from 'react-native';
import { spacing } from '../themes';

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.lg,
};

const FULL: ViewStyle = {
  flex: 1,
};

const CENTER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const commonStyles = {
  CONTAINER,
  FULL,
  CENTER,
};
