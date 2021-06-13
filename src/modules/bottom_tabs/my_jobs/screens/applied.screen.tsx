import React, { useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../../store';
import { InfoCard, Spinner } from '../../../../components';
import { colors } from '../../../../themes';
import { JobInfo } from '../../../../store/job-info';

const AppliedScreen = () => {
  const {
    authStore: { isAuthenticated },
    jobsStore: { getAppliedJobs, appliedJobs, isLoadingAppliedJobs },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getAppliedJobs();
    }
  }, [isAuthenticated, getAppliedJobs]);

  const renderItem: ListRenderItem<JobInfo> = ({ item }) => (
    <InfoCard
      companyName={item.company.name}
      date={item.formattedDate}
      location={item.location.address}
      onPress={() => {}}
      rate={item.formattedHourlyRate}
      time={item.formattedTime}
      title={item.title}
    />
  );

  if (isLoadingAppliedJobs) return <Spinner preset="center" />;

  return (
    <FlatList
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors.white }}
      data={appliedJobs}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
    />
  );
};

export default observer(AppliedScreen);
