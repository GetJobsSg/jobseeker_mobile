import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { commonStyles } from '../../../common';
import { Routes } from '../../../navigator/routes';
import { Button, Header, IconButton, Row, Text } from '../../../components';
import { SectionTitle, SectionEmployer, SectionDateTime, SectionTextContent } from '../components';
import { JobParamsList } from '../types';
import { colors } from '../../../themes';
import { windowWidth } from '../../../utils/screen';
import { useMst } from '../../../store';

type OfferDetailsRouteProp = RouteProp<JobParamsList, Routes.job_offer_details>;

const JobOfferDetails = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    jobInfoStore: {
      getJobDetails,
      acceptJobOffer,
      declineJobOffer,
      isLoading,
      isAllowToAcceptOffer,
      isLoadingAcceptOffer,
      isLoadingDeclineOffer,
      isOfferAccepted,
      isOfferDeclined,
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
  const {
    params: { id },
  } = useRoute<OfferDetailsRouteProp>();

  useEffect(() => {
    getJobDetails(id);
  }, [getJobDetails, id]);

  const renderStickyBottom = () => {
    if (!isAllowToAcceptOffer) {
      return (
        <Text preset="title3" style={{ textAlign: 'center' }}>
          Job stop accepting candidate
        </Text>
      );
    }

    if (isOfferAccepted || isOfferDeclined) {
      return (
        <Text preset="title3" style={{ textAlign: 'center' }}>
          {isOfferAccepted && 'You have accepted the job offer'}
          {isOfferDeclined && 'You have declined the job offer'}
        </Text>
      );
    }

    if (isAuthenticated) {
      return (
        <Row justify="space-between">
          <Button
            preset="outlined"
            label="Decline"
            disabled={isLoadingDeclineOffer}
            style={{ width: windowWidth * 0.4 }}
            onPress={() => declineJobOffer(id)}
          />
          <Button
            label="Accept"
            disabled={isLoadingAcceptOffer}
            style={{ width: windowWidth * 0.5 }}
            onPress={() => acceptJobOffer(id)}
          />
        </Row>
      );
    }

    return null;
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
        title="Job Offer"
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

export default observer(JobOfferDetails);
