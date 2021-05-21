import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ButtonProps } from './button.props';
import { btnPresets, btnTextPresets } from './button.presets';
import { Text } from '..';

const { flatten } = StyleSheet;

const Button = (props: ButtonProps) => {
  const {
    block = false,
    children,
    label,
    onPress,
    preset = 'primary',
    style: btnOverrideStyle,
    textStyle: textStyleOverride,
  } = props;

  const btnTextStyle = flatten([btnTextPresets[preset], textStyleOverride]);
  const content = children || <Text style={btnTextStyle}>{label}</Text>;

  const asBlock = block ? ({ alignSelf: 'auto' } as ViewStyle) : ({ alignSelf: 'flex-start' } as ViewStyle);
  const buttonStyle = flatten([btnPresets[preset], asBlock, btnOverrideStyle]);

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

export default Button;
