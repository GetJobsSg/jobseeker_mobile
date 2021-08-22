import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigator/routes';
import { Container, Button, Text } from '..';

const LoginMessage = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text preset="header">Login</Text>
      <Text>Please sign into your account first</Text>
      <Button
        block
        label="Login"
        style={{ marginTop: 40 }}
        onPress={() => navigation.navigate(Routes.auth_modal_stack, { screen: Routes.authModal_login })}
      />
    </Container>
  );
};

export default LoginMessage;
