import React, { useState } from 'react';
import { View } from 'react-native';
import { CodeField, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import { Button, Text } from '..';
import { OTPVerificationProps } from './otp-verification.props';
import {
  CONTAINER,
  CELL_ROOT,
  CELL,
  CELL_FOCUSED,
  CELL_TEXT,
  TITLE,
  SUBTITLE,
  ERROR_HINT,
} from './otp-verification.style';

const CELL_COUNT = 5;

const OTPVerification = (props: OTPVerificationProps) => {
  const { errorText, title, subTitle, onConfirm } = props;
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  const handleConfirmOTPCode = () => {
    if (code.length !== CELL_COUNT) return;
    onConfirm(code);
  };

  return (
    <>
      <View style={CONTAINER}>
        {!!title && <Text style={TITLE}>{title}</Text>}
        {!!subTitle && <Text style={SUBTITLE}>{subTitle}</Text>}
        <CodeField
          ref={ref}
          keyboardType="number-pad"
          rootStyle={[CELL_ROOT]}
          cellCount={CELL_COUNT}
          value={code}
          onChangeText={(text) => setCode(text)}
          renderCell={({ index, symbol, isFocused }) => (
            <View key={index} style={isFocused ? CELL_FOCUSED : CELL}>
              <Text style={CELL_TEXT}>{symbol}</Text>
            </View>
          )}
        />
        {!!errorText && <Text style={ERROR_HINT}>Invalid code. Please try again later.</Text>}
      </View>
      <Button disabled={code.length !== CELL_COUNT} label="Verify" onPress={handleConfirmOTPCode} />
    </>
  );
};

export default OTPVerification;
