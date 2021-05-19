import React from 'react';
import { Button, Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

type AccountParamList = {
  account: undefined;
};

const FULL: ViewStyle = {
  flex: 1,
};

const CENTER: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const DEFAULT_FONTS: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
};

const Stack = createStackNavigator<AccountParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" component={Account} />
    </Stack.Navigator>
  );
};

const Account = () => {
  const navigation = useNavigation();
  const navigateLogin = () => navigation.navigate('authModal');

  return (
    <SafeAreaView style={FULL}>
      <View style={[FULL, CENTER]}>
        <Text style={[DEFAULT_FONTS]}>Hello Account</Text>
        <Button title="Login" onPress={navigateLogin} />
      </View>
    </SafeAreaView>
  );
};

export default AccountStack;
