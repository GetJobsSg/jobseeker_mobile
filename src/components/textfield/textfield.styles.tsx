import { TextStyle } from 'react-native';
import { colors, fontSize } from '../../themes';

export const FIELD_LABEL: TextStyle = {
  position: 'absolute',
  zIndex: 100,
  top: 16,
  left: 10,
  fontSize: fontSize.tiny,
  color: colors.textSecondary,
  fontWeight: '300',
  marginTop: -10,
};
