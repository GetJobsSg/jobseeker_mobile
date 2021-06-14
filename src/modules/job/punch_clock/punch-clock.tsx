import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { CodeField, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import { Button, Header, IconButton, Screen, Text } from '../../../components';
import { CELL_ROOT, CELL, CELL_FOCUSED, CELL_TEXT } from './puch-clock.styles';
import { JobParamsList } from '../types';
import { Routes } from '../../../navigator/routes';

type PunchClockRouteProp = RouteProp<JobParamsList, Routes.punch_clock>;

const CELL_COUNT = 4;

const PunchClock = () => {
  const {
    params: { type },
  } = useRoute<PunchClockRouteProp>();
  const navigation = useNavigation();

  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  const headerTitle = type === 'clock-in' ? 'Clock In' : 'Clock Out';

  const handleClockInOut = () =>
    type === 'clock-in' ? console.log('calling clock in apis') : console.log('calling clock out apis');

  return (
    <Screen>
      <Header leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      <Text preset="header">{headerTitle}</Text>
      <Text>Please get the security passcode from your employer.</Text>

      <CodeField
        ref={ref}
        keyboardType="number-pad"
        rootStyle={CELL_ROOT}
        cellCount={CELL_COUNT}
        value={code}
        onChangeText={(text) => setCode(text)}
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={isFocused ? CELL_FOCUSED : CELL}>
            <Text style={CELL_TEXT}>{symbol}</Text>
          </View>
        )}
      />

      <Button block label={headerTitle} onPress={handleClockInOut} />
    </Screen>
  );
};

export default PunchClock;
