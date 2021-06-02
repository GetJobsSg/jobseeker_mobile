import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Button } from '../../../components';
import { spacing, colors } from '../../../themes';
import { Routes } from '../../../navigator/routes';

const LoginHeader = () => {
  const navigation = useNavigation();
  const { name: routeName } = useRoute();

  const toLoginScreen = () =>
    navigation.navigate(Routes.auth_modal_stack, { screen: Routes.authModal_login, params: { prevScreen: routeName } });

  const toRegisterScreen = () =>
    navigation.navigate(Routes.auth_modal_stack, {
      screen: Routes.authModal_register,
      params: { prevScreen: routeName },
    });

  return (
    <>
      <Text preset="header">Your account</Text>
      <Button preset="primary" block label="Log in" onPress={toLoginScreen} />
      <Text style={{ marginTop: spacing.md }}>
        <Text preset="hint">Don&apos;t have account? </Text>
        <Text onPress={toRegisterScreen} preset="hint" style={{ color: colors.darkBlue0, fontWeight: '500' }}>
          Create Account
        </Text>
      </Text>
    </>
  );
};

export default LoginHeader;
