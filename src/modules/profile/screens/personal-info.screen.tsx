import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Screen, Text, Header, IconButton, RadioGroup, TextField } from '../../../components';
import { genderOptions } from '../../../constants/options';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const [radioValue, setRadioValue] = useState<string | number>();

  return (
    <Screen>
      <Header leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      <Text preset="header">Personal Info</Text>
      <TextField value="" label="First Name" onChangeText={() => {}} />
      <TextField value="" label="Last Name" onChangeText={() => {}} />

      <RadioGroup
        // alignment="vertical"
        value={radioValue}
        onChange={(selected) => setRadioValue(selected.value)}
        options={genderOptions}
      />
    </Screen>
  );
};

export default PersonalInfo;
