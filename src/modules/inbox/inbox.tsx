import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '../../components';

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

const Inbox = () => (
  <Screen preset="fixed">
    <View style={[FULL, CENTER]}>
      <Text style={[DEFAULT_FONTS]}>Hello Inbox</Text>
    </View>
  </Screen>
);

const InboxStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="inbox" component={Inbox} />
  </Stack.Navigator>
);

export default InboxStack;
