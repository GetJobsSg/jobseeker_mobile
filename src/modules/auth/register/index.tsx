import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers } from 'formik';
import { useMst } from '../../../store';
import { Button, Text, TextField } from '../../../components';
import { commonStyles } from '../../../common';
import { RegisterFormData, RegisterProps } from './types';
import { usePrevious } from '../../../custom_hooks';
import { registerValidationSchema } from './validation';

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
    if (previous.isLoadingRegister !== isLoadingRegister && !isLoadingRegister && !error) {
      setSuccess(true);
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
    if (prevScreen === 'authModal.login') {
      return navigation.goBack();
    }

    // replace with login screen
    return navigation.replace('authModal.login', { prevScreen: route.name });
  };

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
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
                  disabled={!dirty || !isValid}
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
          <>
            <Text>You have successfully register. Login now</Text>
            <Button block preset="primary" label="Login" onPress={handlePostRegisterLogin} style={{ marginTop: 10 }} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
});

export default RegisterScreen;
