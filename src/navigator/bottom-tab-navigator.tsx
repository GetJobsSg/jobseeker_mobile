import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { HomeScreen, InboxScreen, MyJobScreen, AccountScreen } from '../modules/bottom_tabs';
import { Icon, Text } from '../components';
import { colors } from '../themes';
import { BottomTabParams } from './types';
import { Routes } from './routes';
import { useMst } from '../store';

const styles = StyleSheet.create({
  labelActive: {
    fontSize: 10,
    color: colors.primary,
    marginBottom: 0,
  },
  labelInactive: {
    fontSize: 10,
    color: colors.lightGrey2,
    marginBottom: 0,
  },
  iconStyle: {
    width: 28,
    height: 28,
  },
});

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = () => {
  const {
    inboxStore: { inboxMessages },
  } = useMst();

  const insets = useSafeAreaInsets();
  const unSeenMessageCount = inboxMessages.filter((msg) => !msg.seen).length;

  return (
    <Tab.Navigator
      initialRouteName={Routes.bottom_tabs_home}
      tabBarOptions={{
        inactiveTintColor: colors.darkGrey0,
        activeTintColor: colors.primary,
        showLabel: true,
        style: {
          height: insets.bottom ? 45 + insets.bottom : 60,
        },
        tabStyle: {
          height: 50,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name={Routes.bottom_tabs_home}
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }: any) =>
            focused ? <Text style={styles.labelActive}>Home</Text> : <Text style={styles.labelInactive}>Home</Text>,
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <Icon icon="home_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="home_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.bottom_tabs_myjobs}
        component={MyJobScreen}
        options={{
          tabBarLabel: ({ focused }: any) =>
            focused ? (
              <Text style={styles.labelActive}>My Jobs</Text>
            ) : (
              <Text style={styles.labelInactive}>My Jobs</Text>
            ),
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <Icon icon="myjobs_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="myjobs_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.bottom_tabs_inbox}
        component={InboxScreen}
        options={{
          tabBarBadge: unSeenMessageCount || undefined,
          tabBarLabel: ({ focused }: any) =>
            focused ? <Text style={styles.labelActive}>Inbox</Text> : <Text style={styles.labelInactive}>Inbox</Text>,
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <Icon icon="inbox_active" style={styles.iconStyle} />
            ) : (
              <Icon icon="inbox_inactive" style={styles.iconStyle} />
            ),
        }}
      />
      <Tab.Screen
        name={Routes.bottom_tabs_account}
        component={AccountScreen}
        options={{
          tabBarLabel: ({ focused }: any) =>
            focused ? (
              <Text style={styles.labelActive}>Account</Text>
            ) : (
              <Text style={styles.labelInactive}>Account</Text>
            ),
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
};

export default observer(BottomTabNavigator);
