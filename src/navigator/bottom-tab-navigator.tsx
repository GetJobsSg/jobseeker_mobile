import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { HomeScreen, InboxScreen, MyJobScreen, AccountScreen } from '../modules/bottom_tabs';
import { Icon } from '../components';
import { colors } from '../themes';
import { BottomTabParams } from './types';
import { Routes } from './routes';
import { useMst } from '../store';

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
    width: 26,
    height: 26,
  },
});

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = () => {
  const {
    inboxStore: { inboxMessages },
  } = useMst();

  const unSeenMessageCount = inboxMessages.filter((msg) => !msg.seen).length;

  return (
    <Tab.Navigator
      initialRouteName={Routes.bottom_tabs_home}
      tabBarOptions={{ inactiveTintColor: colors.darkGrey0, activeTintColor: colors.primary, showLabel: true }}
    >
      <Tab.Screen
        name={Routes.bottom_tabs_home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
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
          tabBarLabel: 'My Jobs',
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
          tabBarLabel: 'Inbox',
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
          tabBarLabel: 'Account',
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
