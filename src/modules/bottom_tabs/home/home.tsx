import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBarStyle,
  ColorValue,
  SafeAreaView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Header from './header';
import { colors } from '../../../themes';
import { Container, Text } from '../../../components';
import Balance from './balance';
import { renderSpacer } from '../../../utils/screen';

// offsetY threshold to change safeareview and statusbar color
const THRESHOLD = 100;

const HomeScreen = () => {
  const [preset, setPreset] = useState({
    barStyle: 'light-content' as StatusBarStyle,
    backgroundColor: colors.primary as ColorValue,
  });

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < THRESHOLD) {
      setPreset({
        barStyle: 'light-content',
        backgroundColor: colors.primary,
      });
    }
    if (offsetY > THRESHOLD) {
      setPreset({
        barStyle: 'dark-content',
        backgroundColor: colors.semiTransparent,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: preset.backgroundColor }}>
      <ScrollView onScroll={handleOnScroll} scrollEventThrottle={16} style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar backgroundColor={preset.backgroundColor} barStyle={preset.barStyle} />
        {renderSpacer()}
        <View>
          <Header />
          <Balance />
        </View>

        <Container style={{ marginTop: 40 }}>
          <Text preset="title2">Categories</Text>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
