import React from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { colors } from '../../themes';
import { AvatarProps } from './avatar.props';

const Avatar = (props: AvatarProps) => {
  const { uri, size = 60, style: overrideImageStyle, containerStyle } = props;
  const imgStyle = { width: size, height: size, borderRadius: size } as ImageStyle;

  if (!uri) {
    return (
      <View
        style={[{ width: size, height: size, borderRadius: size, backgroundColor: colors.lightGrey1 }, containerStyle]}
      />
    );
  }

  return (
    <View style={containerStyle}>
      <Image style={[imgStyle, overrideImageStyle]} source={{ uri }} />
    </View>
  );
};

export default Avatar;
