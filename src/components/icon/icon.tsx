import React from 'react';
import { Image, View } from 'react-native';
import { IconProps } from './icon.props';
import icons from './icons';

const Icon = (props: IconProps) => {
  const { containerStyle, icon, style: imageStyle, size = 30 } = props;
  const iconName = typeof icon === 'string' ? icons[icon] : icons[icon()];

  return (
    <View style={containerStyle}>
      <Image resizeMode="contain" style={[{ width: size, height: size }, imageStyle]} source={iconName} />
    </View>
  );
};

export default Icon;
