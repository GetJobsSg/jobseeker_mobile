import React from 'react';
import { observer } from 'mobx-react-lite';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { Screen } from '../../../components';

const FULL: ViewStyle = {
  flex: 1,
};

const CENTER: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const DEFAULT_FONTS: TextStyle = {
  fontSize: 26,
  fontWeight: 'bold',
};

const HomeScreen = () => (
  <Screen preset="fixed">
    <View style={[FULL, CENTER]}>
      <Text style={[DEFAULT_FONTS]}>Hello Home</Text>
    </View>
  </Screen>
);

export default observer(HomeScreen);
