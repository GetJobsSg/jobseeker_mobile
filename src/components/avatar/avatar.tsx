import React from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { AvatarProps } from './avatar.props';

const Avatar = (props: AvatarProps) => {
  const { uri, size = 60, style: overrideImageStyle, containerStyle, placeholder } = props;
  const imgStyle = { width: size, height: size, borderRadius: size } as ImageStyle;

  if (!uri) {
    return (
      <View style={containerStyle}>
        <Image style={[imgStyle, overrideImageStyle]} source={placeholder || 0} />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image style={[imgStyle, overrideImageStyle]} source={{ uri }} />
    </View>
  );
};

export default Avatar;
