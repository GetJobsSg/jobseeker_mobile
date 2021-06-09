import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../../components';
import Balance from '../balance';
import { HEADER_CONTAINER, WELCOME_WRAPPER, WELCOME, NAME } from './header.styles';

const Header = () => (
  <View style={[HEADER_CONTAINER]}>
    <View style={WELCOME_WRAPPER}>
      <Text style={WELCOME}>Welcome back,</Text>
      <Text preset="header" style={NAME} numberOfLines={1}>
        Benson Toh
      </Text>
    </View>
    <Balance />
  </View>
);

export default Header;
