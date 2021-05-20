import React from 'react';
import { Button, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components';

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

const Stack = createStackNavigator<AccountParamList>();

const Account = () => {
  const navigation = useNavigation();
  const navigateLogin = () => navigation.navigate('authModal');

  return (
    <SafeAreaView style={FULL}>
      <View style={[FULL, CENTER]}>
        <Text preset="header">Hello Account</Text>
        <Button title="Login" onPress={navigateLogin} />
      </View>
    </SafeAreaView>
  );
};

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="account" component={Account} />
  </Stack.Navigator>
);

export default AccountStack;
