import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegisterScreen from './register';

type AuthScreenParams = {
  'authModal.login': undefined;
  'authModal.register': undefined;
};

const Stack = createStackNavigator<AuthScreenParams>();

const AuthModalStack = () => (
  <Stack.Navigator initialRouteName="authModal.login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="authModal.login" component={LoginScreen} />
    <Stack.Screen name="authModal.register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthModalStack;
