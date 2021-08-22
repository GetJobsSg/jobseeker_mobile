import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { observer } from 'mobx-react-lite';
import { AppliedScreen, CompletedScreen, OngoingScreen, UpcomingScreen } from './screens';
import { Container, Text, Screen, LoginMessage } from '../../../components';
import { colors } from '../../../themes';
import { MyJobsParams } from './types';
import { useMst } from '../../../store';

const Tab = createMaterialTopTabNavigator<MyJobsParams>();

const MyJobScreen = () => {
  const {
    authStore: { isAuthenticated },
  } = useMst();

  return (
    <Screen preset="fixed" withContainer={false}>
      {isAuthenticated ? (
        <>
          <Container>
            <Text preset="header">My Jobs</Text>
          </Container>

          <Tab.Navigator
            tabBarOptions={{
              scrollEnabled: true,
              activeTintColor: colors.black,
              inactiveTintColor: colors.lightGrey2,
              style: { backgroundColor: colors.white, paddingLeft: 10, paddingRight: 10 },
              labelStyle: { marginLeft: 0, marginRight: 0 },
              tabStyle: { width: 'auto', paddingLeft: 10, paddingRight: 10 },
              indicatorStyle: { backgroundColor: colors.black, height: 3, marginLeft: 10, marginRight: 10 },
            }}
          >
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }: any) => {
                  const label = 'Applied';
                  if (focused) return <Text preset="topTabActive">{label}</Text>;
                  return <Text preset="topTabInActive">{label}</Text>;
                },
              }}
              name="myjobs.applied"
              component={AppliedScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }: any) => {
                  const label = 'Ongoing';
                  if (focused) return <Text preset="topTabActive">{label}</Text>;
                  return <Text preset="topTabInActive">{label}</Text>;
                },
              }}
              name="myjobs.ongoing"
              component={OngoingScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }: any) => {
                  const label = 'Upcoming';
                  if (focused) return <Text preset="topTabActive">{label}</Text>;
                  return <Text preset="topTabInActive">{label}</Text>;
                },
              }}
              name="myjobs.upcoming"
              component={UpcomingScreen}
            />
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }: any) => {
                  const label = 'Completed';
                  if (focused) return <Text preset="topTabActive">{label}</Text>;
                  return <Text preset="topTabInActive">{label}</Text>;
                },
              }}
              name="myjobs.completed"
              component={CompletedScreen}
            />
          </Tab.Navigator>
        </>
      ) : (
        <LoginMessage />
      )}
    </Screen>
  );
};

export default observer(MyJobScreen);
