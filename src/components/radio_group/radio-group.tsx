import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '..';
import {
  RADIO_GROUP_CONTAINER,
  RADIO_CONTAINER,
  RADIO_THUMB,
  RADIO_LABEL,
  SELECTED_RADIO_THUMB,
} from './radio-group.styles';
import { RadioOption, RadioProps } from './radio-group.props';

const RadioGroup = (props: RadioProps) => {
  const { alignment = 'horizontal', options, onChange, style, value } = props;

  const handleRadioPress = (option: RadioOption) => () => {
    onChange(option);
  };

  const alignStyle =
    alignment === 'horizontal' ? ({ flexDirection: 'row' } as ViewStyle) : ({ flexDirection: 'column' } as ViewStyle);

  return (
    <View style={[RADIO_GROUP_CONTAINER, alignStyle, style]}>
      {options.map((option) => {
        const thumbStyle = option.value === value ? SELECTED_RADIO_THUMB : RADIO_THUMB;
        return (
          <TouchableOpacity style={RADIO_CONTAINER} key={option.value} onPress={handleRadioPress(option)}>
            <View style={thumbStyle} />
            <Text style={RADIO_LABEL}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;
