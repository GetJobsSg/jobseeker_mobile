import React from 'react';
// import { TextStyle, View, ViewStyle } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Screen } from '../../components';

import { colors } from '../../themes';

// type MyJobsParamList = {
//   myjobs: undefined;
// };

// const FULL: ViewStyle = {
//   flex: 1,
// };

// const CENTER: ViewStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flex: 1,
// };

// const DEFAULT_FONTS: TextStyle = {
//   fontSize: 26,
//   fontWeight: 'bold',
// };

// const Stack = createStackNavigator<MyJobsParamList>();

function HomeScreen() {
  return (
    <Screen unsafeArea={null} withContainer={false}>
      <Text>Home!</Text>
    </Screen>
  );
}

function SettingsScreen() {
  return (
    <Screen unsafeArea={null} withContainer={false}>
      <Text>Settings!</Text>
    </Screen>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Screen preset="fixed" withContainer={false}>
      <Text preset="header">My Jobs</Text>
      <Tab.Navigator
        tabBarOptions={{
          scrollEnabled: true,
          activeTintColor: colors.black,
          inactiveTintColor: colors.lightGrey2,
          style: { backgroundColor: colors.white },
          labelStyle: { marginLeft: 0 },
          tabStyle: { width: 'auto' },
          indicatorStyle: { backgroundColor: colors.black, height: 3 },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Home1" component={HomeScreen} />
        <Tab.Screen name="Settings1" component={SettingsScreen} />
      </Tab.Navigator>
    </Screen>
  );
}
