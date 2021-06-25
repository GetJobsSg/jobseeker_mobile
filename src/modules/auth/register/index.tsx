import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers } from 'formik';
import Toast from 'react-native-toast-message';
import { useMst } from '../../../store';
import { Button, IconButton, Header, Screen, Text, TextField } from '../../../components';
import { RegisterFormData, RegisterProps } from './types';
import { usePrevious } from '../../../custom_hooks';
import { registerValidationSchema } from './validation';
import { IconTypes } from '../../../components/icon/icons';
import { Routes } from '../../../navigator/routes';

const initialValues: RegisterFormData = {
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
};

const RegisterScreen = observer((props: RegisterProps) => {
  const [success, setSuccess] = useState(false);
  const {
    authStore: { register, error, isLoadingRegister },
  } = useMst();

  const [validationRequred, setOnChangeValidation] = useState(false);

  const previous = usePrevious({ isLoadingRegister, error });
  useEffect(() => {
    // do nothing if undefined
    if (!previous) return;

    // user successfully register
    if (previous.isLoadingRegister !== isLoadingRegister && !isLoadingRegister && error === '') {
      setSuccess(true);
    }

    // display registration error
    if (previous.isLoadingRegister !== isLoadingRegister && !isLoadingRegister && error) {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        position: 'bottom',
        text1: error,
      });
    }
  }, [previous, isLoadingRegister, error]);

  const handleFormSubmit = (values: RegisterFormData, action: FormikHelpers<RegisterFormData>) => {
    const { setSubmitting } = action;
    const { cPassword, ...rest } = values; // omit cPassword
    setSubmitting(true);
    register(rest);
  };

  const handlePostRegisterLogin = () => {
    const { route, navigation } = props;
    const prevScreen = route?.params?.prevScreen;

    // if user is navigate from login to register screen, goback to login screen
    if (prevScreen === Routes.authModal_login) {
      return navigation.goBack();
    }

    // replace with login screen
    return navigation.replace(Routes.authModal_login, { prevScreen: route.name });
  };

  const isPrevScreenLogin = () => {
    const { route } = props;
    const prevScreen = route?.params?.prevScreen;
    return prevScreen === Routes.authModal_login;
  };

  const renderHeaderBtnIcon = (): IconTypes => {
    if (isPrevScreenLogin()) return 'circle_back_btn';
    return 'circle_cross_btn';
  };

  return (
    <Screen preset="scroll">
      <Header leftIcon={<IconButton icon={renderHeaderBtnIcon} onPress={() => props.navigation.goBack()} />} />

      {!success && (
        <Formik
          validateOnChange={validationRequred}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={registerValidationSchema}
        >
          {({ dirty, handleChange, values, isValid, errors, handleSubmit, touched }) => (
            <>
              <Text preset="header">Create Account</Text>
              <TextField
                error={{
                  shown: touched.email && errors.email,
                  message: errors.email,
                }}
                label="Email"
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TextField
                autoCapitalize="none"
                error={{
                  shown: touched.password && errors.password,
                  message: errors.password,
                }}
                label="Password"
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry
                returnKeyType="next"
              />
              <TextField
                autoCapitalize="none"
                error={{
                  shown: touched.cPassword && errors.cPassword,
                  message: errors.cPassword,
                }}
                label="Confirm Password"
                onChangeText={handleChange('cPassword')}
                value={values.cPassword}
                secureTextEntry
                returnKeyType="next"
              />
              <TextField
                error={{
                  shown: touched.firstName && errors.firstName,
                  message: errors.firstName,
                }}
                label="First Name"
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TextField
                error={{
                  shown: touched.lastName && errors.lastName,
                  message: errors.lastName,
                }}
                label="Last Name"
                onChangeText={handleChange('lastName')}
                value={values.lastName}
                autoCapitalize="none"
                returnKeyType="done"
              />
              <Button
                block
                disabled={!dirty || !isValid || isLoadingRegister}
                preset="primary"
                label="Create Account"
                onPress={() => {
                  setOnChangeValidation(true);
                  handleSubmit();
                }}
                style={{ marginTop: 10 }}
              />
            </>
          )}
        </Formik>
      )}

      {success && (
        <View>
          <Text preset="header">You have successfully register.</Text>
          <Button preset="outlined" label="Login Now" onPress={handlePostRegisterLogin} style={{ marginTop: 10 }} />
        </View>
      )}
    </Screen>
  );
});

export default RegisterScreen;
