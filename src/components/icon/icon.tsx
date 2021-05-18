import React from 'react';
import { Image, View } from 'react-native';
import { IconProps } from './icon.props';
import icons from './icons';

const Icon = (props: IconProps) => {
  const { containerStyle, icon, style: imageStyle } = props;

  return (
    <View style={containerStyle}>
      <Image resizeMode="contain" style={imageStyle} source={icons[icon]} />
    </View>
  );
};

export default Icon;
