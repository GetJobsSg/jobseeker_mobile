import React, { useEffect, useCallback } from 'react';
import { RefreshControl, StatusBar, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import Header from './header';
import { BackgroundView, Text, InfoCard, Spinner } from '../../../components';
import { commonStyles } from '../../../common';
import { colors, spacing } from '../../../themes';
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

  const renderContent = () => {
    if (isLoadingRecentJobs) {
      return (
        <View style={{ backgroundColor: colors.white, marginBottom: 500 }}>
          <Spinner preset="center" />
        </View>
      );
    }

    if (recentJobs.length === 0) {
      return (
        <View style={[commonStyles.SAFE_MARGIN, { marginBottom: 500 }]}>
          <Text preset="title2">Jobs Posted</Text>
          <Text preset="hint" style={{ marginTop: spacing.md }}>
            No available jobs. Check back later!
          </Text>
        </View>
      );
    }

    return (
      <View style={[commonStyles.SAFE_MARGIN]}>
        <Text preset="title2">Jobs Posted</Text>
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
      </View>
    );
  };

  return (
    <BackgroundView
      scrollViewProps={{
        refreshControl: (
          <RefreshControl
            refreshing={isLoadingRecentJobs}
            onRefresh={handleRefresh}
            tintColor={colors.white}
            style={{ backgroundColor: colors.primary }}
          />
        ),
      }}
    >
      <StatusBar barStyle="light-content" />
      <Header />
      {renderContent()}
    </BackgroundView>
  );
};

export default observer(HomeScreen);
