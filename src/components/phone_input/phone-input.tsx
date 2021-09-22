import React, { useState } from 'react';
import { View, TextInput, TextStyle } from 'react-native';
import { Text } from '..';
import { colors, spacing } from '../../themes';
import { PhoneInputProps } from './phone-input.props';
import { DIALING_CODE_TEXT, DIALING_CODE_WRAPPER, ERROR_HINTS, FIELD_WRAPPER, PHONE_INPUT } from './phone-input.styles';

const dialingCode = '+65';

const PhoneInput = (props: PhoneInputProps) => {
  const { label, value } = props;
  const [focus, setFocus] = useState(false);
  const textInputStyle = focus ? ({ borderBottomColor: colors.black } as TextStyle) : {};

  return (
    <View style={FIELD_WRAPPER}>
      <Text preset="labelTiny">{label}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: spacing.xxs }}>
        <View style={[DIALING_CODE_WRAPPER, textInputStyle]}>
          {/* In future serve more than one country, modify this into a country dial code selector */}
          <Text style={DIALING_CODE_TEXT}>{dialingCode}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardType="number-pad"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={value}
            style={[PHONE_INPUT, textInputStyle]}
          />
        </View>
      </View>
      <Text style={ERROR_HINTS}>Invalid mobile number format</Text>
    </View>
  );
};

export default PhoneInput;
