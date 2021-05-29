import React from 'react';
import { Image, View } from 'react-native';
import { IconProps } from './icon.props';
import icons from './icons';

const Icon = (props: IconProps) => {
  const { containerStyle, icon, style: imageStyle } = props;
  const iconName = typeof icon === 'string' ? icons[icon] : icons[icon()];

  return (
    <View style={containerStyle}>
      <Image resizeMode="contain" style={imageStyle} source={iconName} />
    </View>
  );
};

export default Icon;
