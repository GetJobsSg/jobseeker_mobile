import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../themes';
import { Button, Text, TextField } from '../../../components';
import { commonStyles } from '../../../common';

const DEFAULT_FONTS: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {};
  const navigateToRegister = () => navigation.navigate('authModal.register');

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

        <Button preset="outlined" label="login" onPress={handleLogin} />
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
