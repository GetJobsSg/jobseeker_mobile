import React from 'react';
import { Image, ImageStyle, ImageURISource, View } from 'react-native';
import { AvatarProps } from './avatar.props';

const Avatar = (props: AvatarProps) => {
  const { uri, size = 60, style: overrideImageStyle, containerStyle } = props;
  const imgStyle = { width: size, height: size, borderRadius: size } as ImageStyle;

  const imgSource = uri ? ({ uri } as ImageURISource) : require('../../assets/images/default-avatar.jpeg');

  return (
    <View style={containerStyle}>
      <Image style={[imgStyle, overrideImageStyle]} source={imgSource} />
    </View>
  );
};

export default Avatar;
