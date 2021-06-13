import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
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

  const navigation = useNavigation();

  useEffect(() => {
    getRecentJobs();
    if (isAuthenticated) {
      getUser();
      getWallet();
    }
  }, [isAuthenticated, getRecentJobs, getUser, getWallet]);

  const goToDetails = (id: number) => () => {
    navigation.navigate(Routes.job_stack, { screen: Routes.job_details, params: { id } });
  };

  return (
    <Screen refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}>
      <Header />

      <Text preset="title2">Recent Job</Text>

      {recentJobs.map((item) => (
        <InfoCard
          key={item.id}
          companyName={item.company?.name}
          date={item.formattedDate}
          location={item.location?.address}
          onPress={goToDetails(item.id)}
          rate={item.formattedHourlyRate}
          time={item.formattedTime}
          title={item.title}
        />
      ))}
    </Screen>
  );
};

export default observer(HomeScreen);
