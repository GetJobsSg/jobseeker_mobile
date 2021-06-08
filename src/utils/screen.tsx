import React from 'react';
import { ColorValue, Dimensions, Platform, View } from 'react-native';
import { colors } from '../themes';

const { width, height } = Dimensions.get('window');

const renderSpacer = (bgColor = colors.primary as ColorValue) => {
  if (Platform.OS === 'ios') {
    return (
      <View
        style={{
          backgroundColor: bgColor,
          height: 1000,
          position: 'absolute',
          top: -1000,
          left: 0,
          right: 0,
        }}
      />
    );
  }
  return null;
};

export { width as windowWidth, height as windowHeight, renderSpacer };
