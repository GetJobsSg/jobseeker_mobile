import React from 'react';
import { StyleProp, TextStyle, TextProps as RNTextProps } from 'react-native';
import { TextPresets } from './text.presets';

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  preset?: TextPresets;
}
