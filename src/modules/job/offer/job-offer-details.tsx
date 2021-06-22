import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { Routes } from 'src/navigator/routes';
import { Button, Container, Header, IconButton, Text } from '../../../components';
import { JobParamsList } from '../types';
import { useMst } from '../../../store';

type OfferDetailsRouteProp = RouteProp<JobParamsList, Routes.job_offer_details>;

const JobOfferDetails = () => {
  const navigation = useNavigation();
  const {
    jobInfoStore: { getJobDetails, title },
  } = useMst();
  const {
    params: { id },
  } = useRoute<OfferDetailsRouteProp>();

  useEffect(() => {
    getJobDetails(id);
  }, [getJobDetails, id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        style={{ paddingHorizontal: 15 }}
        title="Job Offer"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />
      <Container>
        <Text>{title}</Text>
        <Button label="Accept Offer" onPress={() => {}} />
      </Container>
    </SafeAreaView>
  );
};

export default JobOfferDetails;
