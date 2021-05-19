import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountStack, HomeStack, InboxStack, MyJobStack } from '../modules';
import { Icon } from '../components';
import { colors } from '../themes';

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

type BottomTabParams = {
  homeStack: undefined;
  myjobStack: undefined;
  inboxStack: undefined;
  accountStack: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="homeStack"
    tabBarOptions={{ inactiveTintColor: colors.darkGrey0, activeTintColor: colors.primary, showLabel: false }}
  >
    <Tab.Screen
      name="homeStack"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused }: any) =>
          focused ? (
            <Icon icon="home_active" style={styles.iconStyle} />
          ) : (
            <Icon icon="home_inactive" style={styles.iconStyle} />
          ),
      }}
    />
    <Tab.Screen
      name="myjobStack"
      component={MyJobStack}
      options={{
        tabBarIcon: ({ focused }: any) =>
          focused ? (
            <Icon icon="myjobs_active" style={styles.iconStyle} />
          ) : (
            <Icon icon="myjobs_inactive" style={styles.iconStyle} />
          ),
      }}
    />
    <Tab.Screen
      name="inboxStack"
      component={InboxStack}
      options={{
        tabBarIcon: ({ focused }: any) =>
          focused ? (
            <Icon icon="inbox_active" style={styles.iconStyle} />
          ) : (
            <Icon icon="inbox_inactive" style={styles.iconStyle} />
          ),
      }}
    />
    <Tab.Screen
      name="accountStack"
      component={AccountStack}
      options={{
        tabBarIcon: ({ focused }: any) =>
          focused ? (
            <Icon icon="account_active" style={styles.iconStyle} />
          ) : (
            <Icon icon="account_inactive" style={styles.iconStyle} />
          ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
