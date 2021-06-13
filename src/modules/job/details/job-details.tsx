import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Routes } from '../../../navigator/routes';
import { colors } from '../../../themes';
import { Header, IconButton, Button } from '../../../components';
import { SectionTitle, SectionEmployer, SectionDateTime, SectionTextContent } from '../components';
import { commonStyles } from '../../../common';
import { useMst } from '../../../store';
import { JobParamsList } from '../types';

type JobDetailsRouteProp = RouteProp<JobParamsList, Routes.job_details>;

const JobDetails = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<JobDetailsRouteProp>();
  const {
    authStore: { isAuthenticated },
    jobInfoStore: {
      getJobDetails,
      applyJob,
      isApplying,
      isAllowApply,
      isLoading,
      title,
      formattedHourlyRate,
      formattedDate,
      formattedTime,
      responsibilities,
      requirements,
      company,
      location,
    },
  } = useMst();

  useEffect(() => {
    getJobDetails(id);
  }, [id, getJobDetails]);

  const renderStickyBottom = () => {
    if (!isAuthenticated) {
      return (
        <Button
          block
          label="Login"
          onPress={() => {
            navigation.navigate(Routes.auth_modal_stack, { screen: Routes.authModal_login });
          }}
        />
      );
    }

    if (isAllowApply) {
      return <Button block disabled={isApplying} label="APPLY NOW" onPress={() => applyJob(id)} />;
    }

    return <Button block disabled label="APPLIED" onPress={() => {}} />;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        style={{ paddingHorizontal: 15 }}
        title="Job Details"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />

      <ScrollView>
        <SectionTitle title={title} rate={formattedHourlyRate} />
        <SectionEmployer companyLogo={company.logo} companyName={company.name} onPress={() => {}} />
        <SectionDateTime date={formattedDate} time={formattedTime} />

        <SectionTextContent sectionTitle="Requirement" text={requirements} />
        <SectionTextContent sectionTitle="Responsibilities" text={responsibilities} />
        <SectionTextContent sectionTitle="Location" text={location.address} />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={commonStyles.STICKY_BOTTOM}>{renderStickyBottom()}</View>
    </SafeAreaView>
  );
};

export default observer(JobDetails);
