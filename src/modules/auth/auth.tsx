import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegisterScreen from './register';
import { AuthModalStackParamList } from './types';

const Stack = createStackNavigator<AuthModalStackParamList>();

const AuthModalStack = () => (
  <Stack.Navigator initialRouteName="authModal.login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="authModal.login" component={LoginScreen} />
    <Stack.Screen name="authModal.register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthModalStack;
