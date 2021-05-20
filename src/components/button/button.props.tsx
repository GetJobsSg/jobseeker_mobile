import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ButtonPresets } from './button.presets';

export interface ButtonProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  preset?: ButtonPresets;
  label?: string;
  block?: boolean;
  onPress: () => void;
}
