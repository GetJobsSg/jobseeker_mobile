import React from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text } from '../../../../components';
import Balance from '../balance';
import { HEADER_CONTAINER, WELCOME_WRAPPER, WELCOME, NAME, NAME_PLACEHOLDER } from './header.styles';
import { useMst } from '../../../../store';

const Header = () => {
  const {
    authStore: { isAuthenticated },
    userStore: { firstName, isLoading },
  } = useMst();

  const renderUsername = () => (
    <Text preset="header" style={NAME} numberOfLines={1}>
      {firstName}
    </Text>
  );

  const renderPlaceholder = () => <View style={NAME_PLACEHOLDER} />;

  if (isAuthenticated) {
    return (
      <View style={[HEADER_CONTAINER]}>
        <View style={WELCOME_WRAPPER}>
          <Text style={WELCOME}>Welcome back,</Text>
          {isLoading ? renderPlaceholder() : renderUsername()}
        </View>
        <Balance />
      </View>
    );
  }

  return null;
};

export default observer(Header);
