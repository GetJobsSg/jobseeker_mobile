import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { spacing } from '../../../themes';
import { Button, Screen, Header, IconButton } from '../../../components';

const OtpVerifyScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen preset="fixed">
      <Header
        title="Email Verification"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
      />

      <Button style={{ marginTop: spacing.md }} preset="primary" block label="Verify" onPress={() => {}} />
    </Screen>
  );
};

export default observer(OtpVerifyScreen);
