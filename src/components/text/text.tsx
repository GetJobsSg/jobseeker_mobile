import React from 'react';
import { Text as ReactNativeText, StyleSheet } from 'react-native';
import { TextProps } from './text.props';
import { presets } from './text.presets';

const { flatten } = StyleSheet;

const Text = (props: TextProps) => {
  const { children, preset = 'default', onPress, style: overrideStyle, ...rest } = props;
  const textStyle = flatten([presets[preset], overrideStyle]);

  return (
    <ReactNativeText onPress={onPress} style={textStyle} {...rest}>
      {children}
    </ReactNativeText>
  );
};

export default Text;
