import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { TextFieldProps } from './textfield.props';
import { presets } from './textfield.presets';
import { Text } from '..';
import { colors } from '../../themes';
import { ERROR_HINTS, FIELD_WRAPPER } from './textfield.styles';

const { flatten } = StyleSheet;

const TextField = (props: TextFieldProps) => {
  const {
    error = null,
    onChangeText,
    preset = 'default',
    keyboardType = 'default',
    label = '',
    value = '',
    style: overrideStyle,
    editable = true,
    ...rest
  } = props;
  const [focus, setFocus] = useState(false);

  const focusStyle = focus
    ? ({ borderBottomWidth: 1, borderColor: colors.black } as TextStyle)
    : ({ borderBottomWidth: 1, borderColor: colors.lightGrey1 } as TextStyle);

  const disabledStyle = !editable
    ? ({ color: colors.lightGrey2, borderBottomColor: colors.transparent } as ViewStyle)
    : {};

  const textFieldStyle = flatten([presets[preset], focusStyle, overrideStyle, disabledStyle]);

  const labelStyle = focus ? ({ color: colors.black } as TextStyle) : {};

  return (
    <View style={FIELD_WRAPPER}>
      <Text preset="labelTiny" style={[labelStyle]}>
        {label}
      </Text>
      <TextInput
        editable={editable}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={textFieldStyle}
        onChangeText={onChangeText}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        value={value}
        {...rest}
      />
      {error && error.shown && error.message && <Text style={ERROR_HINTS}>{error.message}</Text>}
    </View>
  );
};

export default TextField;
