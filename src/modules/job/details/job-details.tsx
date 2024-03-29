import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { IVerificationStatus } from '../../../constants/types';
import { Routes } from '../../../navigator/routes';
import { colors } from '../../../themes';
import { Header, IconButton, Button, Text } from '../../../components';
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
    userStore: { verificationStatus },
    jobInfoStore: {
      getJobDetails,
      applyJob,
      desc,
      dressCode,
      isApplying,
      isAllowApply,
      isLoading,
      title,
      formattedHourlyRate,
      formattedDate,
      formattedTime,
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

    if (verificationStatus === IVerificationStatus.NOT_INITIATED) {
      return (
        <Text preset="small" style={{ textAlign: 'center' }}>
          Complete your worker profile and start to apply for job as soon as your profile is verified.
        </Text>
      );
    }
    if (
      verificationStatus === IVerificationStatus.PENDING_REVIEW ||
      verificationStatus === IVerificationStatus.REQUIRED_UPDATE
    ) {
      return (
        <Text preset="small" style={{ textAlign: 'center' }}>
          Your profile is pending review. Once your profile is approved you will be able to apply this job.
        </Text>
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

  const onSelectEmployer = () => {
    navigation.navigate(Routes.company_stack, { screen: Routes.company_details, params: { id: company.id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        title="Job Details"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />

      <ScrollView>
        <SectionTitle title={title} rate={formattedHourlyRate} />
        <SectionEmployer companyLogo={company.logo} companyName={company.name} onPress={onSelectEmployer} />
        <SectionDateTime date={formattedDate} time={formattedTime} />
        <SectionTextContent sectionTitle="Description" text={desc} />
        <SectionTextContent sectionTitle="Dress Code" text={dressCode.name} />
        <SectionTextContent sectionTitle="Location" text={location.address} />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={commonStyles.STICKY_BOTTOM}>{renderStickyBottom()}</View>
    </SafeAreaView>
  );
};

export default observer(JobDetails);
