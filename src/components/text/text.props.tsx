import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextPresets } from './text.presets';

export interface TextProps extends TextStyle {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  preset?: TextPresets;
}
