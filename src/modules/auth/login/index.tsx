import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers } from 'formik';
import Toast from 'react-native-toast-message';
import { colors, spacing } from '../../../themes';
import { Button, Text, TextField } from '../../../components';
import { commonStyles } from '../../../common';
import { LoginProps, LoginFormData } from './types';
import { useMst } from '../../../store';
import { loginValidationSchema } from './validation';
import { usePrevious } from '../../../custom_hooks';

const initialValues: LoginFormData = {
  email: '',
  password: '',
};

const LoginScreen = observer((props: LoginProps) => {
  const { navigation } = props;
  const [validationRequred, setOnChangeValidation] = useState(false);

  const {
    authStore: { isAuthenticated, login, isLoadingLogin, error },
  } = useMst();

  useEffect(() => {
    // successfully login
    if (isAuthenticated) {
      navigation.goBack();
    }
  }, [navigation, isAuthenticated]);

  const previous = usePrevious({ isLoadingLogin, error });
  useEffect(() => {
    // do nothing if undefined
    if (!previous) return;

    // display login error
    if (previous?.isLoadingLogin !== isLoadingLogin && !isLoadingLogin && error !== '') {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        position: 'bottom',
        text1: error,
      });
    }
  }, [previous, isLoadingLogin, error]);

  const handleFormSubmit = (value: LoginFormData, action: FormikHelpers<LoginFormData>) => {
    const { setSubmitting } = action;
    const { email, password } = value;

    setSubmitting(true);
    login(email, password);
  };

  const navigateToRegister = () => {
    const currRouteName = props.route.name;
    navigation.navigate('authModal.register', { prevScreen: currRouteName });
  };

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <Formik
        validateOnChange={validationRequred}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ dirty, handleChange, values, isValid, errors, handleSubmit, touched }) => (
          <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
            <Text preset="header">Login</Text>

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
            />

            <Button
              preset="outlined"
              block
              disabled={!isValid || !dirty || isLoadingLogin}
              label="Login"
              onPress={() => {
                setOnChangeValidation(true);
                handleSubmit();
              }}
            />

            <Text
              style={{ color: colors.darkBlue0, marginTop: spacing.lg, textAlign: 'right' }}
              onPress={navigateToRegister}
            >
              Create Account
            </Text>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
});

export default LoginScreen;
