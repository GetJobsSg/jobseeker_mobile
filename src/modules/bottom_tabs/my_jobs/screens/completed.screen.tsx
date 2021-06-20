import React, { useEffect } from 'react';
import { FlatList, ListRenderItem, ScrollView, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../navigator/routes';
import { useMst } from '../../../../store';
import { InfoCard, Spinner, Text } from '../../../../components';
import { colors } from '../../../../themes';
import { JobInfo } from '../../../../store/job-info';

const CompletedScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    jobsStore: { getCompletedJobs, completedJobs, isLoadingCompletedJobs },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getCompletedJobs();
    }
  }, [isAuthenticated, getCompletedJobs]);

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

  if (isLoadingCompletedJobs) return <Spinner preset="center" />;

  if (completedJobs.length === 0) {
    return (
      <ScrollView
        refreshControl={<RefreshControl onRefresh={() => getCompletedJobs()} refreshing={isLoadingCompletedJobs} />}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}
      >
        <Text style={{ color: colors.lightGrey2 }} preset="title2">
          You do not complete any jobs
        </Text>
      </ScrollView>
    );
  }

  return (
    <FlatList
      refreshControl={<RefreshControl onRefresh={() => getCompletedJobs()} refreshing={isLoadingCompletedJobs} />}
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ paddingHorizontal: 10, backgroundColor: colors.white }}
      data={completedJobs}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
    />
  );
};

export default observer(CompletedScreen);
