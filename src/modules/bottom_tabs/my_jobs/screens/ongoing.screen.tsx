import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { ScrollView, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Routes } from '../../../../navigator/routes';
import { colors, spacing } from '../../../../themes';
import { Container, Spinner, PunchedCard, Text } from '../../../../components';
import { useMst } from '../../../../store';

const OnGoingScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    jobsStore: { isLoadingOnGoingJobs, getOnGoingJobs, onGoingJobs },
  } = useMst();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    getOnGoingJobs().finally(() => setRefreshing(false));
  };

  const handleOperation = (jobId: number, clockInTime: string, clockOutTime: string) => () => {
    // user have clock in and clock out
    if (clockInTime && clockOutTime) return;

    // user havent clock in
    if (!clockInTime) {
      navigation.navigate(Routes.job_stack, {
        screen: Routes.punch_clock,
        params: { type: 'clock-in', jobId },
      });
      return;
    }

    // user have clock in
    navigation.navigate(Routes.job_stack, {
      screen: Routes.punch_clock,
      params: { type: 'clock-out', jobId },
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOnGoingJobs();
    }
  }, [isAuthenticated, getOnGoingJobs]);

  if (isLoadingOnGoingJobs && !refreshing) return <Spinner preset="center" />;

  if (onGoingJobs.length === 0) {
    return (
      <ScrollView
        refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}
      >
        <Text style={{ color: colors.lightGrey2 }} preset="title2">
          You have no ongoing jobs
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />}
      style={{ flex: 1, backgroundColor: colors.white }}
    >
      <Container style={{ marginVertical: spacing.md }}>
        {onGoingJobs.map((job) => (
          <PunchedCard
            key={job.id}
            title={job.title}
            companyName={job.company.name}
            date={job.formattedDate}
            time={job.formattedTime}
            clockInTime={job.clockInTime ? moment(job.clockInTime).format('hh:mm a') : ''}
            clockOutTime={job.clockOutTime ? moment(job.clockOutTime).format('hh:mm a') : ''}
            onPress={handleOperation(job.id, job.clockInTime, job.clockOutTime)}
          />
        ))}
      </Container>
    </ScrollView>
  );
};

export default observer(OnGoingScreen);
