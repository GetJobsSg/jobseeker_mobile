import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from '../../components';

type MyJobsParamList = {
  myjobs: undefined;
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

const Stack = createStackNavigator<MyJobsParamList>();

const MyJobs = () => (
  <Screen preset="fixed">
    <View style={[FULL, CENTER]}>
      <Text style={[DEFAULT_FONTS]}>Hello MyJobs</Text>
    </View>
  </Screen>
);

const MyJobsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="myjobs" component={MyJobs} />
  </Stack.Navigator>
);

export default MyJobsStack;
