import React, { useEffect, useCallback } from 'react';
import { RefreshControl, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import Header from './header';
import { Text, InfoCard, Screen } from '../../../components';
import { commonStyles } from '../../../common';
import { spacing } from '../../../themes';
import { useMst } from '../../../store';

const HomeScreen = () => {
  const {
    authStore: { isAuthenticated },
    jobsStore: { getRecentJobs, isLoadingRecentJobs, recentJobs },
    userStore: { getUser },
    walletStore: { getWallet },
  } = useMst();

  const navigation = useNavigation();

  const fetchData = useCallback(() => {
    getRecentJobs();
    if (isAuthenticated) {
      getUser();
      getWallet();
    }
  }, [isAuthenticated, getUser, getWallet, getRecentJobs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  const goToDetails = (id: number) => () => {
    navigation.navigate(Routes.job_stack, { screen: Routes.job_details, params: { id } });
  };

  return (
    <Screen
      preset="scroll"
      addHorizontalPadding={false}
      refreshControl={<RefreshControl refreshing={isLoadingRecentJobs} onRefresh={handleRefresh} />}
    >
      <Header />

      <View style={commonStyles.SAFE_MARGIN}>
        <Text preset="title2">Jobs Posted</Text>
        {recentJobs.length === 0 ? (
          <Text preset="hint" style={{ marginTop: spacing.md }}>
            No available jobs. Check back later!
          </Text>
        ) : (
          recentJobs.map((item) => (
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
          ))
        )}
      </View>
    </Screen>
  );
};

export default observer(HomeScreen);
