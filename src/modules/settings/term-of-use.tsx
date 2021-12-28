import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { FixedScreen, Header, IconButton } from '../../components';

const TermOfUseScreen = () => {
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
      <WebView source={{ uri: 'https://www.getjobsfor.me/privacy' }} />
    </FixedScreen>
  );
};

export default TermOfUseScreen;
