import React from 'react';
import { TouchableOpacity, Image, View, ViewStyle, TextStyle } from 'react-native';
import { colors, fontSize, spacing } from '../../../themes';
import { Icon, Text } from '../../../components';
import { windowHeight } from '../../../utils/screen';

interface FrameProps {
  onPress: () => void;
  displayImage: string | undefined;
  placeholder?: string;
}

const CONTAINER = {
  position: 'relative',
  marginBottom: spacing.lg,
  borderWidth: 1,
  borderRadius: 10,
  borderColor: colors.lightGrey1,
} as ViewStyle;

const PLACEHOLDER_CONTAINER = {
  left: 0,
  top: 0,
  position: 'absolute',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
} as ViewStyle;

const PLACEHOLDER_HINT = {
  color: colors.lightGrey2,
  fontSize: fontSize.xs,
  marginTop: spacing.sm,
  maxWidth: 230,
} as TextStyle;

const Frame = (props: FrameProps) => {
  const { onPress, displayImage, placeholder = '' } = props;
  return (
    <TouchableOpacity style={CONTAINER} onPress={onPress}>
      <Image style={{ height: windowHeight * 0.3 }} source={{ uri: displayImage || undefined }} resizeMode="contain" />
      {!displayImage && (
        <View style={PLACEHOLDER_CONTAINER}>
          <Icon icon="select_image" />
          <Text style={PLACEHOLDER_HINT}>{placeholder}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Frame;
