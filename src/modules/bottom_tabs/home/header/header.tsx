import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '../../../../components';
import Balance from '../balance';
import { HEADER_CONTAINER, WELCOME_WRAPPER, WELCOME, NAME } from './header.styles';
import { useMst } from '../../../../store';

const Header = () => {
  const {
    authStore: { isAuthenticated },
  } = useMst();

  if (isAuthenticated) {
    return (
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
  }

  return null;
};

export default observer(Header);
