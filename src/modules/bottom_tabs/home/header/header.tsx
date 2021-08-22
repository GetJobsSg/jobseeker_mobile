import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Routes } from '../../../../navigator/routes';
import { Text, Card } from '../../../../components';
import { colors } from '../../../../themes';
import Balance from '../balance';
import {
  MAIN_CONTAINER,
  HEADER_CONTAINER,
  WELCOME_WRAPPER,
  WELCOME,
  NAME,
  NAME_PLACEHOLDER,
  FLOATING_VIEW,
} from './header.styles';
import { useMst } from '../../../../store';

const Header = () => {
  const navigation = useNavigation();
  const { name: routeName } = useRoute();

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

  const renderRandomGreeting = () => {
    const greeting = ['Job seeker! 🎉', 'Job hunting buddy! 👫'];
    return greeting[Math.floor(Math.random() * greeting.length)];
  };

  const toLoginScreen = () =>
    navigation.navigate(Routes.auth_modal_stack, { screen: Routes.authModal_login, params: { prevScreen: routeName } });

  if (isAuthenticated) {
    return (
      <View style={MAIN_CONTAINER}>
        <View style={[HEADER_CONTAINER]}>
          <View style={WELCOME_WRAPPER}>
            <Text style={WELCOME}>Welcome back,</Text>
            {isLoading ? renderPlaceholder() : renderUsername()}
          </View>
        </View>
        <View style={FLOATING_VIEW}>
          <Balance />
        </View>
      </View>
    );
  }

  return (
    <View style={MAIN_CONTAINER}>
      <View style={[HEADER_CONTAINER]}>
        <View style={WELCOME_WRAPPER}>
          <Text style={WELCOME}>Hello there,</Text>
          <Text preset="header" style={NAME} numberOfLines={1}>
            {renderRandomGreeting()}
          </Text>
        </View>
      </View>
      <View style={FLOATING_VIEW}>
        <Card onPress={toLoginScreen}>
          <Text preset="hint">Interested in a job?</Text>
          <Text style={{ color: colors.darkBlue0, fontWeight: '500' }}>Join us and start applying!</Text>
        </Card>
      </View>
    </View>
  );

  return null;
};

export default observer(Header);
