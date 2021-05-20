import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TextStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../themes';
import { Button, Text } from '../../../components';
import { commonStyles } from '../../../common';

const DEFAULT_FONTS: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
};

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {};
  const navigateToRegister = () => navigation.navigate('authModal.register');

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
        <Text preset="header" style={[DEFAULT_FONTS]}>
          Login
        </Text>
        <Button preset="ghost" label="login" onPress={handleLogin} />
        <Text style={{ color: colors.darkBlue0 }} onPress={navigateToRegister}>
          Create Account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
