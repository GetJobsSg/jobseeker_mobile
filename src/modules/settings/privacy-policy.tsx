import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { FixedScreen, Header, IconButton } from '../../components';
import PrivacyHtml from './privacy-policy.html';

// const PrivacyPolicyScreen = () => <WebView source={{ uri: PP }} />;
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
      <WebView source={PrivacyHtml} />
    </FixedScreen>
  );
};

export default PrivacyPolicyScreen;
