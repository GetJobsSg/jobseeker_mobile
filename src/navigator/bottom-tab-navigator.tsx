import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, MyJobScreen, InboxScreen, AccountScreen } from '../modules';
import { Icon } from '../components';
import { colors } from '../themes';

const BottomTab = createBottomTabNavigator();

const styles = StyleSheet.create({
  labelActive: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: 'bold',
  },
  labelInactive: {
    fontSize: 8,
    color: colors.lightGrey2,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.labelActive}>Home</Text> : <Text style={styles.labelInactive}>Home</Text>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon icon="home_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="home_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <BottomTab.Screen
        name="my-jobs"
        component={MyJobScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={styles.labelActive}>My Jobs</Text>
            ) : (
              <Text style={styles.labelInactive}>My Jobs</Text>
            ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon icon="myjobs_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="myjobs_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <BottomTab.Screen
        name="inbox"
        component={InboxScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.labelActive}>Inbox</Text> : <Text style={styles.labelInactive}>Inbox</Text>,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon icon="inbox_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="inbox_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <BottomTab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text style={styles.labelActive}>Account</Text>
            ) : (
              <Text style={styles.labelInactive}>Account</Text>
            ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon icon="account_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="account_inactive" style={styles.iconStyle} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
