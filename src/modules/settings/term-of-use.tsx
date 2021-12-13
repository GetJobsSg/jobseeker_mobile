import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import TermUseHtml from './terms-of-use.html';
import { FixedScreen, Header, IconButton } from '../../components';

// const TermOfUseScreen = () => <WebView source={{ uri: 'https://reactnative.dev/' }} />;
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
      <WebView source={TermUseHtml} />
    </FixedScreen>
  );
};

export default TermOfUseScreen;
