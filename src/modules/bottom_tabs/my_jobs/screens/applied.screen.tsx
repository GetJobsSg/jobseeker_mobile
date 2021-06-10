import React from 'react';
import { FlatList } from 'react-native';
import { InfoCard } from '../../../../components';
import { colors } from '../../../../themes';

const dummy = [1, 2, 3];

const renderItem = () => (
  <InfoCard
    companyName="Grand Hyatt Singapore"
    date="14 Apr"
    location="Orchard"
    onPress={() => {}}
    rate="$12/hr"
    time="09:00am - 17:00pm"
    title="Kitchen Helper"
  />
);

const AppliedScreen = () => (
  <FlatList
    onRefresh={() => {}}
    refreshing
    style={{ backgroundColor: colors.white }}
    contentContainerStyle={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors.white }}
    data={dummy}
    renderItem={renderItem}
    keyExtractor={(item) => item.toString()}
  />
);

export default AppliedScreen;
