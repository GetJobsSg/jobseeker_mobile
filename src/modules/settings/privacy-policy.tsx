import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { FixedScreen, Header, IconButton } from '../../components';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <FixedScreen
      px={0}
      appBar={
        <Header
          title="Privacy Policy"
          leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        />
      }
    >
      <WebView source={{ uri: 'https://www.getjobsfor.me/terms' }} />
    </FixedScreen>
  );
};

export default PrivacyPolicyScreen;
