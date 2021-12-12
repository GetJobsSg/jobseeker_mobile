import React, { useEffect, useCallback } from 'react';
import { View, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import { Text, Header, Screen, IconButton, Avatar, InfoCard } from '../../../components';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { commonStyles } from '../../../common';
import { CompanyDetailsProps } from '../types';
import { MAIN_CONTAINER, HEADER_CONTAINER, FLOATING_VIEW } from './company.styles';

const CompanyDetailsScreen = () => {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<CompanyDetailsProps>();

  const {
    jobsStore: { getCompanyJobs, companyJobs },
    companyStore: { getCompanyDetails, name, description, logo, address, isLoading },
  } = useMst();

  const fetchData = useCallback(() => {
    getCompanyJobs(id);
    getCompanyDetails(id);
  }, [getCompanyJobs, getCompanyDetails, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  const goToDetails = (jobID: number) => () => {
    navigation.navigate(Routes.job_stack, { screen: Routes.job_details, params: { jobID } });
  };

  return (
    <Screen
      preset="scroll"
      addHorizontalPadding={false}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
    >
      <View style={MAIN_CONTAINER}>
        <View style={[HEADER_CONTAINER]}>
          <Header
            color={colors.white}
            title=""
            leftIcon={
              <IconButton
                icon="circle_back_btn"
                iconStyle={{ tintColor: colors.white }}
                onPress={() => navigation.goBack()}
              />
            }
            style={{ borderBottomColor: 'rgba(0,0,0,0)' }}
          />
        </View>
        <View style={FLOATING_VIEW}>
          <Avatar style={{ backgroundColor: colors.white }} uri={logo} size={100} />
        </View>
      </View>

      <View style={[{ alignItems: 'center' }, commonStyles.SAFE_PADDING]}>
        <Text preset="title2">{name}</Text>
        <Text preset="hint" style={{ marginTop: spacing.xs }}>
          {address?.address} {address?.blockNo ? `, ${address?.blockNo}` : ''} {address?.unitNo}
        </Text>
        <Text preset="hint" style={{ marginTop: spacing.xs }}>
          {address?.postalCode}
        </Text>

        <Text style={{ marginTop: spacing.md }}>{description}</Text>
      </View>

      <View style={[commonStyles.SAFE_PADDING, { marginTop: spacing.xl }]}>
        <Text preset="title2">Recent Listings</Text>

        {companyJobs.length === 0 ? (
          <Text preset="hint" style={{ marginTop: spacing.md }}>
            No available jobs. Check back later!
          </Text>
        ) : (
          companyJobs.map((item) => (
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
          ))
        )}
      </View>
    </Screen>
  );
};

export default observer(CompanyDetailsScreen);
