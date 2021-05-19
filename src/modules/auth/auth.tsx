import React from 'react';
import { Button, Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthParamList = {
  auth: undefined;
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

const Stack = createStackNavigator<AuthParamList>();

const AuthModalStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={Auth} />
    </Stack.Navigator>
  );
};

const Auth = () => {
  const handleLogin = () => {};

  const handleCreateAccount = () => {};

  return (
    <SafeAreaView style={FULL}>
      <View style={[FULL, CENTER]}>
        <Text style={[DEFAULT_FONTS]}>Hello Auth</Text>
        <Button title="Sign In" onPress={handleLogin} />
        <Button title="Create Account" onPress={handleCreateAccount} />
      </View>
    </SafeAreaView>
  );
};

export default AuthModalStack;
