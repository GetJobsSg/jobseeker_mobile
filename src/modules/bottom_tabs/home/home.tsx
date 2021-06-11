import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import Header from './header';
import { Text, InfoCard, Screen } from '../../../components';
import { useMst } from '../../../store';

const HomeScreen = () => {
  const {
    authStore: { isAuthenticated },
    jobsStore: { getRecentJobs, recentJobs },
    userStore: { getUser },
    walletStore: { getWallet },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getRecentJobs();
      getUser();
      getWallet();
    }
  }, [isAuthenticated, getWallet, getUser]);

  console.log('>>>>>>>>>..recentJobs', recentJobs);

  return (
    <Screen refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
      <Header />

      <Text preset="title2">Recent Job</Text>

      {recentJobs.map((item) => (
        <InfoCard
          key={item.id}
          companyName={item.company?.name}
          date="14 Apr"
          location="Orchard"
          onPress={() => {}}
          rate={item.formattedHourlyRate}
          time="09:00am - 17:00pm"
          title="Kitchen Helper"
        />
      ))}
    </Screen>
  );
};

export default observer(HomeScreen);
