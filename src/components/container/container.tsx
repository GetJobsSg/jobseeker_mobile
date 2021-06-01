import React from 'react';
import { View } from 'react-native';
import { ContainerProps } from './container.props';
import { presets } from './container.presets';

const Container = (props: ContainerProps) => {
  const { children, style: containerStyle, preset = 'wrap' } = props;

  return <View style={[presets[preset], containerStyle]}>{children}</View>;
};

export default Container;
