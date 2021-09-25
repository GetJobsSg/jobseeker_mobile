import React, { useState } from 'react';
import { View, TextInput, TextStyle } from 'react-native';
import { Text } from '..';
import { colors, spacing } from '../../themes';
import { PhoneInputProps } from './phone-input.props';
import { DIALING_CODE_TEXT, DIALING_CODE_WRAPPER, ERROR_HINTS, FIELD_WRAPPER, PHONE_INPUT } from './phone-input.styles';

const PhoneInput = (props: PhoneInputProps) => {
  const { dialingCode, error, label, onChangeText, value } = props;
  const [focus, setFocus] = useState(false);
  const focusStyle = focus ? ({ borderBottomColor: colors.black } as TextStyle) : {};

  return (
    <View style={FIELD_WRAPPER}>
      <Text preset="labelXXS">{label}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: spacing.xxs }}>
        <View style={[DIALING_CODE_WRAPPER, focusStyle]}>
          {/* In future serve more than one country, modify this into a country dial code selector */}
          <Text style={[DIALING_CODE_TEXT]}>{dialingCode}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardType="number-pad"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={value}
            onChangeText={onChangeText}
            style={[PHONE_INPUT, focusStyle]}
          />
        </View>
      </View>
      {error && error.shown && error.message && <Text style={ERROR_HINTS}>{error.message}</Text>}
    </View>
  );
};

export default PhoneInput;
