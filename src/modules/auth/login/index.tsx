import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik, FormikHelpers } from 'formik';
import Toast from 'react-native-toast-message';
import { colors, spacing } from '../../../themes';
import { Button, Header, IconButton, FixedScreen, Text, TextField } from '../../../components';
import { LoginProps, LoginFormData } from './types';
import { useMst } from '../../../store';
import { loginValidationSchema } from './validation';
import { usePrevious } from '../../../custom_hooks';
import { Routes } from '../../../navigator/routes';
import AppLogo from '../../../assets/images/app-logo.png';
import { windowWidth } from '../../../utils/screen';

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
    navigation.navigate(Routes.authModal_register, { prevScreen: currRouteName });
  };

  return (
    <FixedScreen
      appBar={
        <Header
          style={{ borderBottomColor: 'transparent' }}
          leftIcon={<IconButton icon="circle_cross_btn" onPress={() => navigation.goBack()} />}
        />
      }
    >
      <Formik
        validateOnChange={validationRequred}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ dirty, handleChange, values, isValid, errors, handleSubmit, touched }) => (
          <View>
            <View style={{ paddingTop: 30, paddingBottom: 30 }}>
              <Image
                style={{ width: windowWidth - 100, height: 50, alignSelf: 'center' }}
                source={AppLogo}
                resizeMode="contain"
              />
            </View>

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
              autoCapitalize="none"
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
              style={{ marginTop: spacing.xl }}
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
    </FixedScreen>
  );
});

export default LoginScreen;
