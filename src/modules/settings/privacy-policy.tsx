import React from 'react';
import { WebView } from 'react-native-webview';
import PP from './pp.html';

const PrivacyPolicyScreen = () => <WebView source={{ uri: PP }} />;

export default PrivacyPolicyScreen;
