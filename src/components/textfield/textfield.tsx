import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { TextFieldProps } from './textfield.props';
import { presets } from './textfield.presets';
import { Text } from '..';
import { colors } from '../../themes';
import { FIELD_LABEL } from './textfield.styles';

const { flatten } = StyleSheet;

const TextField = (props: TextFieldProps) => {
  const { onChangeText, preset = 'default', label = '', value = '', style: overrideStyle, ...rest } = props;
  const [focus, setFocus] = useState(false);

  const focusStyle = focus ? ({ borderWidth: 1, borderColor: colors.black } as TextStyle) : {};
  const textFieldStyle = flatten([presets[preset], focusStyle, overrideStyle]);

  const labelStyle = focus ? ({ color: colors.black } as TextStyle) : {};

  return (
    <View style={{ position: 'relative' }}>
      <Text style={[FIELD_LABEL, labelStyle]}>{label}</Text>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={textFieldStyle}
        onChangeText={onChangeText}
        selectionColor={colors.primary}
        value={value}
        {...rest}
      />
    </View>
  );
};

export default TextField;
