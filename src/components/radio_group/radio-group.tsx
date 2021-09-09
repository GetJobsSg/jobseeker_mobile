import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '..';
import {
  RADIO_FIELD_CONTAINER,
  RADIO_CONTAINER,
  RADIO_THUMB,
  RADIO_LABEL,
  SELECTED_RADIO_THUMB,
  SELECTED_RADIO_LABEL,
  ERROR_HINTS,
} from './radio-group.styles';
import { RadioOption, RadioProps } from './radio-group.props';

const RadioGroup = (props: RadioProps) => {
  const { error = null, alignment = 'horizontal', label, options, onChange, style, value } = props;

  const handleRadioPress = (option: RadioOption) => () => onChange(option);

  const alignStyle =
    alignment === 'horizontal'
      ? ({ flexDirection: 'row', flexWrap: 'wrap' } as ViewStyle)
      : ({ flexDirection: 'column' } as ViewStyle);

  return (
    <View style={RADIO_FIELD_CONTAINER}>
      <Text preset="label">{label}</Text>
      <View style={[alignStyle, style]}>
        {options.map((option) => {
          const thumbStyle = option.value === value ? SELECTED_RADIO_THUMB : RADIO_THUMB;
          return (
            <TouchableOpacity style={RADIO_CONTAINER} key={option.value} onPress={handleRadioPress(option)}>
              <View style={thumbStyle} />
              <Text style={option.value === value ? SELECTED_RADIO_LABEL : RADIO_LABEL}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && error.shown && error.message && <Text style={ERROR_HINTS}>{error.message}</Text>}
    </View>
  );
};

export default RadioGroup;
