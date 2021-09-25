import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Screen, Header, IconButton, PhoneInput, Text, OtpVerification } from '../../../components';
import { useSuccess } from '../../../custom_hooks';
import { Routes } from '../../../navigator/routes';
import { useMst } from '../../../store';
import { colors, spacing } from '../../../themes';
import { ProfileParamList } from '../types';
import { mobileValidator } from '../../../common';

type ScreenRouteProp = RouteProp<ProfileParamList, Routes.editMobile>;

const mobileValidationSchema = yup.object({
  dialCode: yup.string().required(),
  mobileNumber: mobileValidator,
});

const MobileEditScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<ScreenRouteProp>();
  const { mobile } = params;

  const {
    userStore: {
      // send otp
      updateMobileNumber,
      isSendingOTP,
      sendOTPError,
      // verify otp
      verifyOTP,
      isVerifyingOTP,
      verifyOTPError,
    },
  } = useMst();

  const initialValues = {
    dialCode: mobile.slice(0, 3) || '+65',
    mobileNumber: mobile.slice(3) || '',
  };

  const { errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: mobileValidationSchema,
    onSubmit: (_values) => {
      const mobileNo = _values.dialCode + _values.mobileNumber;
      updateMobileNumber(mobileNo);
    },
  });

  // successfully sent otp
  const successSentOTP = useSuccess({ loadingState: isSendingOTP, errorState: sendOTPError });
  // successfully verify otp
  const successVerifyOTP = useSuccess({ loadingState: isVerifyingOTP, errorState: verifyOTPError });

  useEffect(() => {
    if (successVerifyOTP) {
      navigation.goBack();
    }
  }, [navigation, successVerifyOTP]);

  const renderContent = () => {
    if (successSentOTP) {
      return (
        <OtpVerification
          title="Verify your mobile number"
          subTitle="We have sent an OTP to your mobile number xxxx for verification"
          onConfirm={(code) => verifyOTP('mobile', code)}
          errorText={verifyOTPError}
        />
      );
    }

    return (
      <>
        <PhoneInput
          dialingCode={values.dialCode}
          error={{
            message: errors.mobileNumber || errors.dialCode,
            shown: !!errors,
          }}
          maxLength={8}
          label="Mobile No"
          value={values.mobileNumber}
          onChangeText={(text) => setFieldValue('mobileNumber', text)}
        />
        {!!sendOTPError && <Text style={{ color: colors.textDanger }}>{sendOTPError}</Text>}
        <Button style={{ marginTop: spacing.md }} preset="primary" block label="Send OTP" onPress={handleSubmit} />
      </>
    );
  };

  return (
    <Screen preset="fixed">
      <Header
        title="Mobile Number"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />
      {renderContent()}
    </Screen>
  );
};

export default observer(MobileEditScreen);
