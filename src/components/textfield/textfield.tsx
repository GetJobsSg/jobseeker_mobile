import React, { useState } from 'react';
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { TextFieldProps } from './textfield.props';
import { presets } from './textfield.presets';
import { Text } from '..';
import { colors } from '../../themes';
import { FIELD_LABEL, ERROR_HINTS } from './textfield.styles';

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
    ...rest
  } = props;
  const [focus, setFocus] = useState(false);

  const focusStyle = focus ? ({ borderWidth: 1, borderColor: colors.black } as TextStyle) : {};
  const textFieldStyle = flatten([presets[preset], focusStyle, overrideStyle]);

  const labelStyle = focus ? ({ color: colors.black } as TextStyle) : {};
  const bottomSpacing = !error?.shown ? ({ marginBottom: 25 } as ViewStyle) : {}; // allocate some bottom spacing when no error hint is display

  return (
    <View style={[{ position: 'relative' }, bottomSpacing]}>
      <>
        <Text style={[FIELD_LABEL, labelStyle]}>{label}</Text>
        <TextInput
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
      </>
    </View>
  );
};

export default TextField;
