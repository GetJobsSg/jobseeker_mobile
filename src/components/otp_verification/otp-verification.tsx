import React, { useEffect, useRef, useState } from 'react';
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
const INITIAL_COUNTDOWN_TIME = 90;

const OTPVerification = (props: OTPVerificationProps) => {
  const { errorText, title, subTitle, initCountdownTimerOnmount = false, onConfirm, onResendOTP } = props;

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  const [remainingSecond, setRemainingSecond] = useState(INITIAL_COUNTDOWN_TIME);
  const timerRef = useRef(-1);

  const handleStopCountdown = () => {
    clearInterval(timerRef.current);
    timerRef.current = -1;
  };

  const updateTime = () => {
    setRemainingSecond((prev) => {
      if (prev <= 0) {
        handleStopCountdown();
        return INITIAL_COUNTDOWN_TIME;
      }
      return prev - 1;
    });
  };

  const handleStartCountdown = () => {
    const intervalId = setInterval(() => updateTime(), 1000);
    timerRef.current = Number(intervalId);
  };

  const handleConfirmOTPCode = () => {
    if (code.length !== CELL_COUNT) return;
    onConfirm(code);
  };

  const handleResendOTP = () => {
    handleStartCountdown();
    onResendOTP();
  };

  useEffect(() => {
    // start the countdown counter when page mounted
    if (initCountdownTimerOnmount) {
      handleStartCountdown();
    }
    return () => handleStopCountdown();
  }, []);

  const renderResendView = () => {
    if (remainingSecond === INITIAL_COUNTDOWN_TIME) {
      return (
        <Text preset="hint">
          Did not get your OTP?{' '}
          <Text preset="hint" style={{ textDecorationLine: 'underline' }} onPress={handleResendOTP}>
            Resend
          </Text>
        </Text>
      );
    }
    return <Text preset="hint">Resend verification in {remainingSecond} seconds</Text>;
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
        {renderResendView()}
      </View>
      <Button disabled={code.length !== CELL_COUNT} label="Verify" onPress={handleConfirmOTPCode} />
    </>
  );
};

export default OTPVerification;
