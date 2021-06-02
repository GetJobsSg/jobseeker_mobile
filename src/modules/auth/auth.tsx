import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegisterScreen from './register';
import { AuthModalStackParamList } from './types';
import { Routes } from '../../navigator/routes';

const Stack = createStackNavigator<AuthModalStackParamList>();

const AuthModalStack = () => (
  <Stack.Navigator initialRouteName={Routes.authModal_login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Routes.authModal_login} component={LoginScreen} />
    <Stack.Screen name={Routes.authModal_register} component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthModalStack;
