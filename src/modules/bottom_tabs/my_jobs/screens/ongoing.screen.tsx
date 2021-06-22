import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
          You do not apply to any job
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
            clockInTime=""
            clockOutTime=""
            onPress={() =>
              navigation.navigate(Routes.job_stack, {
                screen: Routes.punch_clock,
                params: { type: 'clock-in', jobId: job.id },
              })
            }
          />
        ))}
      </Container>
    </ScrollView>
  );
};

export default observer(OnGoingScreen);
