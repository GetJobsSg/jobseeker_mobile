import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Routes } from '../../../navigator/routes';
import { useSuccess } from '../../../custom_hooks';
import { useMst } from '../../../store';
import { Screen, Header, IconButton, OtpVerification } from '../../../components';
import { ProfileParamList } from '../types';

type ScreenRouteProp = RouteProp<ProfileParamList, Routes.verifyEmail>;

const EmailVerifyScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<ScreenRouteProp>();
  const { email } = params;

  const {
    userStore: { resendOTP, verifyOTP, isVerifyingOTP, verifyOTPError },
  } = useMst();

  // success verify otp
  const successVerifyOTP = useSuccess({ loadingState: isVerifyingOTP, errorState: verifyOTPError });

  useEffect(() => {
    if (successVerifyOTP) {
      navigation.goBack();
    }
  }, [navigation, successVerifyOTP]);

  return (
    <Screen preset="fixed">
      <Header
        title="Email Verification"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />
      <OtpVerification
        title="Verify your email address"
        subTitle={`We have sent an OTP to ${email}. Please insert the passcode for verification`}
        onConfirm={(code) => verifyOTP('email', code)}
        onResendOTP={() => resendOTP('email')}
        errorText={verifyOTPError}
      />
    </Screen>
  );
};

export default observer(EmailVerifyScreen);
