import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Routes } from 'src/navigator/routes';
import { spacing } from '../../../themes';
import { Button, Screen, Header, IconButton, PhoneInput } from '../../../components';
import { ProfileParamList } from '../types';

type ScreenRouteProp = RouteProp<ProfileParamList, Routes.editMobile>;

const MobileEditScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<ScreenRouteProp>();
  const { mobile } = params;

  const [dialCode] = useState(mobile.slice(0, 3) || '');
  const [phoneNo, setPhoneNo] = useState(mobile.slice(3) || '');

  return (
    <Screen preset="fixed">
      <Header
        title="Mobile Number"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />

      <PhoneInput dialingCode={dialCode} label="Mobile No" value={phoneNo} onChangeText={(text) => setPhoneNo(text)} />

      <Button
        style={{ marginTop: spacing.md }}
        preset="primary"
        block
        label="Verify"
        onPress={() => {
          // TODO call apis to update and then send otp
          console.log(`${dialCode}${phoneNo}`);
        }}
      />
    </Screen>
  );
};

export default observer(MobileEditScreen);
