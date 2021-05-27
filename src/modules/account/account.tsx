import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { spacing, colors } from '../../themes';
import { Button, Text, Screen } from '../../components';
import { useMst } from '../../store';

type AccountParamList = {
  account: undefined;
};

const Stack = createStackNavigator<AccountParamList>();

const LoginHeader = () => {
  const navigation = useNavigation();
  const { name: routeName } = useRoute();

  const toLoginScreen = () =>
    navigation.navigate('authModal', { screen: 'authModal.login', params: { prevScreen: routeName } });

  const toRegisterScreen = () =>
    navigation.navigate('authModal', { screen: 'authModal.register', params: { prevScreen: routeName } });

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

const ProfileHeader = () => {
  const {
    authStore: { logout },
  } = useMst();

  const handleLogout = () => {
    // TODO: prompt error messag for user double confirm
    logout();
  };

  return (
    <>
      <Text preset="header">Hi,Benson</Text>
      <Button preset="outlined" block label="Logout" onPress={handleLogout} />
    </>
  );
};

const Account = observer(() => {
  const {
    authStore: { isAuthenticated },
  } = useMst();

  return (
    <Screen preset={isAuthenticated ? 'scroll' : 'fixed'}>
      {isAuthenticated ? <ProfileHeader /> : <LoginHeader />}
    </Screen>
  );
});

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="account" component={Account} />
  </Stack.Navigator>
);

export default AccountStack;
