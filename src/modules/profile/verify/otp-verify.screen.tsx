import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { spacing } from '../../../themes';
import { Button, Screen, Header, IconButton, PhoneInput } from '../../../components';

const OtpVerifyScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen preset="fixed">
      <Header
        title="Mobile Number"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />

      <PhoneInput dialingCode="+65" label="Mobile No" value="90449045" onChangeText={() => {}} />

      <Button style={{ marginTop: spacing.md }} preset="primary" block label="Verify" onPress={() => {}} />
    </Screen>
  );
};

export default observer(OtpVerifyScreen);
