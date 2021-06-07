import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { ButtonProps } from './button.props';
import { btnPresets, btnTextPresets } from './button.presets';
import { Text } from '..';

const { flatten } = StyleSheet;

const Button = (props: ButtonProps) => {
  const {
    block = false,
    children,
    disabled = false,
    label,
    onPress,
    preset = 'primary',
    style: btnOverrideStyle,
    textStyle: textStyleOverride,
  } = props;

  const btnTextStyle = flatten([btnTextPresets[preset], textStyleOverride]);
  const content = children || <Text style={btnTextStyle}>{label}</Text>;

  const asBlock = block ? ({ alignSelf: 'auto' } as ViewStyle) : ({ alignSelf: 'flex-start' } as ViewStyle);
  const withBtnState = disabled ? btnPresets[preset].disabled : btnPresets[preset].normal;
  const buttonStyle = [withBtnState, asBlock, btnOverrideStyle];

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <View style={buttonStyle}>{content}</View>
    </TouchableOpacity>
  );
};

export default Button;
