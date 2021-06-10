import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import Header from './header';
import { Text, InfoCard, Screen } from '../../../components';
import { useMst } from '../../../store';

const HomeScreen = () => {
  const {
    authStore: { isAuthenticated },
    userStore: { getUser },
    walletStore: { getWallet },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
      getWallet();
    }
  }, [isAuthenticated, getWallet, getUser]);

  return (
    <Screen refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
      <Header />

      <Text preset="title2">Recent Job</Text>
      <InfoCard
        companyName="Grand Hyatt Singapore"
        date="14 Apr"
        location="Orchard"
        onPress={() => {}}
        rate="$12/hr"
        time="09:00am - 17:00pm"
        title="Kitchen Helper"
      />
      <InfoCard
        companyName="Grand Hyatt Singapore"
        date="14 Apr"
        location="Orchard"
        onPress={() => {}}
        rate="$12/hr"
        time="09:00am - 17:00pm"
        title="Kitchen Helper"
      />
    </Screen>
  );
};

export default observer(HomeScreen);
