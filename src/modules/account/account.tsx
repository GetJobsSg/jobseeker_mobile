import React from 'react';
import { View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { spacing, colors } from '../../themes';
import { Button, Text } from '../../components';

type AccountParamList = {
  account: undefined;
};

const FULL: ViewStyle = {
  flex: 1,
};

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.lg,
};

const Stack = createStackNavigator<AccountParamList>();

const Account = () => {
  const navigation = useNavigation();
  const toLoginScreen = () => navigation.navigate('authModal', { screen: 'authModal.login' });
  const toRegisterScreen = () => navigation.navigate('authModal', { screen: 'authModal.register' });

  return (
    <SafeAreaView style={FULL}>
      <View style={[FULL, CONTAINER]}>
        <Text preset="header">Your account</Text>
        <Button preset="primary" block label="Log in" onPress={toLoginScreen} />
        <Text style={{ marginTop: spacing.md }}>
          <Text preset="hint">Don&apos;t have account? </Text>
          <Text onPress={toRegisterScreen} preset="hint" style={{ color: colors.darkBlue0, fontWeight: '500' }}>
            Create Account
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="account" component={Account} />
  </Stack.Navigator>
);

export default AccountStack;
