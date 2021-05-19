import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type InboxParamList = {
  inbox: undefined;
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

const Stack = createStackNavigator<InboxParamList>();

const InboxStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="inbox" component={Inbox} />
    </Stack.Navigator>
  );
};

const Inbox = () => {
  return (
    <SafeAreaView style={FULL}>
      <View style={[FULL, CENTER]}>
        <Text style={[DEFAULT_FONTS]}>Hello Inbox</Text>
      </View>
    </SafeAreaView>
  );
};

export default InboxStack;
