import React, { useState } from 'react';
import { TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../themes';
import { Button, Text, TextField } from '../../../components';
import { commonStyles } from '../../../common';
import { LoginProps } from './types';
import { firebaseLogin } from '../../../utils/firebase';

const DEFAULT_FONTS: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
};

const LoginScreen = (props: LoginProps) => {
  console.log(props);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebaseLogin(email, password)
      .then((user) => {
        console.log('login successfull.>>>>>', user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToRegister = () => {};

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
        <Text preset="header" style={[DEFAULT_FONTS]}>
          Login
        </Text>

        <TextField
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField label="Password" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry />

        <Button preset="outlined" block label="login" onPress={handleLogin} />

        <Text
          style={{ color: colors.darkBlue0, marginTop: spacing.lg, textAlign: 'right' }}
          onPress={navigateToRegister}
        >
          Create Account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
