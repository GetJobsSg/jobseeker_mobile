import React, { useEffect } from 'react';
import { FlatList, ListRenderItem, RefreshControl, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../navigator/routes';
import { useMst } from '../../../../store';
import { InfoCard, Spinner, Text } from '../../../../components';
import { colors } from '../../../../themes';
import { JobInfo } from '../../../../store/job-info';

const UpcomingScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    jobsStore: { getUpcomingJobs, upcomingJobs, isLoadingUpcomingJobs },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getUpcomingJobs();
    }
  }, [isAuthenticated, getUpcomingJobs]);

  const renderItem: ListRenderItem<JobInfo> = ({ item }) => (
    <InfoCard
      companyName={item.company.name}
      date={item.formattedDate}
      location={item.location.address}
      onPress={() => navigation.navigate(Routes.job_stack, { screen: Routes.job_details, params: { id: item.id } })}
      rate={item.formattedHourlyRate}
      time={item.formattedTime}
      title={item.title}
    />
  );

  if (isLoadingUpcomingJobs) return <Spinner preset="center" />;

  if (upcomingJobs.length === 0) {
    return (
      <ScrollView
        refreshControl={<RefreshControl onRefresh={() => getUpcomingJobs()} refreshing={isLoadingUpcomingJobs} />}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}
      >
        <Text style={{ color: colors.lightGrey2 }} preset="title2">
          No Upcoming Jobs
        </Text>
      </ScrollView>
    );
  }

  return (
    <FlatList
      refreshControl={<RefreshControl onRefresh={() => getUpcomingJobs()} refreshing={isLoadingUpcomingJobs} />}
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ paddingHorizontal: 10, backgroundColor: colors.white }}
      data={upcomingJobs}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
    />
  );
};

export default observer(UpcomingScreen);
