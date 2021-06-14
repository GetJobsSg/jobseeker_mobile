import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../navigator/routes';
import { colors, spacing } from '../../../../themes';
import { Container, PunchedCard } from '../../../../components';

const OnGoingScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container style={{ marginVertical: spacing.md }}>
        <PunchedCard
          title="Kitchen Helper"
          companyName="Grand Hyatt Singapore"
          date="29 Apr"
          time="09:00am - 10:00pm"
          clockInTime=""
          clockOutTime=""
          onPress={() =>
            navigation.navigate(Routes.job_stack, { screen: Routes.punch_clock, params: { type: 'clock-in' } })
          }
        />
      </Container>
    </ScrollView>
  );
};

export default OnGoingScreen;
