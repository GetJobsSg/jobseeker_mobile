import React from 'react';
import { View } from 'react-native';
import { Text } from '..';
import { presets } from './tag.presets';
import { TagProps } from './tag.props';

const Tag = (props: TagProps) => {
  const { children, label, preset = 'primary', style: overrideStyle } = props;

  const containerStyle = presets[preset].container;
  const textStyle = presets[preset].text;

  const content = label ? <Text style={textStyle}>{label}</Text> : children;
  return <View style={[containerStyle, overrideStyle]}>{content}</View>;
};

export default Tag;
