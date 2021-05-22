import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from '../../../components';
import { commonStyles } from '../../../common';

const RegisterScreen = () => {
  const handleLogin = () => {};

  const handleRegister = () => {};

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
        <Text preset="header">Create Account</Text>
        <Button preset="outlined" label="Create" onPress={handleRegister} />
        <Button preset="outlined" label="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;