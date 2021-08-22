import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { CodeField, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import { Button, Header, IconButton, Screen, Text } from '../../../components';
import { CELL_ROOT, CELL, CELL_FOCUSED, CELL_TEXT } from './punch-clock.styles';
import { JobParamsList } from '../types';
import { Routes } from '../../../navigator/routes';
import { useMst } from '../../../store';
import { useSuccess } from '../../../custom_hooks';
import { spacing } from '../../../themes';

type PunchClockRouteProp = RouteProp<JobParamsList, Routes.punch_clock>;

const CELL_COUNT = 4;

const PunchClock = () => {
  const {
    params: { type, jobId },
  } = useRoute<PunchClockRouteProp>();
  const navigation = useNavigation();

  const {
    jobsStore: { getOnGoingJobs },
    jobInfoStore: { clockInJob, clockOutJob, isLoadingClockIn, isLoadingClockOut, clockInError, clockOutError },
  } = useMst();

  // code handler
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  // successfully clockIn or clockOut
  const isSuccessClockIn = useSuccess({ loadingState: isLoadingClockIn, errorState: clockInError });
  const isSuccessClockOut = useSuccess({ loadingState: isLoadingClockOut, errorState: clockOutError });

  if (isSuccessClockIn || isSuccessClockOut) {
    getOnGoingJobs();
    navigation.goBack();
  }

  const headerTitle = type === 'clock-in' ? 'Clock In' : 'Clock Out';

  const handleClockInOut = (inputCode: string) => {
    if (type === 'clock-in') {
      clockInJob(jobId, inputCode);
    } else {
      clockOutJob(jobId, inputCode);
    }
  };

  return (
    <Screen>
      <Header leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      <Text preset="header">{headerTitle}</Text>
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 15,
          marginTop: spacing.xl,
          overflow: 'hidden',
          alignSelf: 'center',
        }}
      >
        <QRCodeScanner
          onRead={(e) => handleClockInOut(e.data)}
          reactivate
          reactivateTimeout={2000}
          cameraStyle={{ width: 200, height: 200 }}
        />
      </View>

      <View style={{ marginTop: 30, paddingBottom: spacing.xl, alignSelf: 'center' }}>
        <Text preset="hint" style={{ textAlign: 'center' }}>
          Unable to scan the QR code?
        </Text>
        <Text preset="hint" style={{ textAlign: 'center' }}>
          You may instead, enter the code below
        </Text>
        <CodeField
          ref={ref}
          keyboardType="number-pad"
          rootStyle={[CELL_ROOT, { alignSelf: 'center' }]}
          cellCount={CELL_COUNT}
          value={code}
          onChangeText={(text) => setCode(text)}
          renderCell={({ index, symbol, isFocused }) => (
            <View key={index} style={isFocused ? CELL_FOCUSED : CELL}>
              <Text style={CELL_TEXT}>{symbol}</Text>
            </View>
          )}
        />
      </View>

      <Button
        block
        label={headerTitle}
        disabled={isLoadingClockIn || isLoadingClockOut}
        onPress={() => handleClockInOut(code)}
      />
    </Screen>
  );
};

export default observer(PunchClock);
