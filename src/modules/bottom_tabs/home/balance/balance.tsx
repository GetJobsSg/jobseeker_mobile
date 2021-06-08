import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../../navigator/routes';
import { colors } from '../../../../themes';
import { Icon, Row, Text } from '../../../../components';
import { BALANCE_CONTAINER, BALANCE_CARD_WRAPPER, BALANCE_LABEL } from './balance.styles';

const Balance = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      underlayColor={colors.lightGrey2}
      style={BALANCE_CONTAINER}
      onPress={() => navigation.navigate(Routes.wallet_stack)}
    >
      <View style={BALANCE_CARD_WRAPPER}>
        <Row justify="space-between">
          <View>
            <Text style={BALANCE_LABEL}>Wallet Balance</Text>
            <Text preset="title1">$0.00</Text>
          </View>
          <Icon icon="ic_arrow_right_primary" />
        </Row>
      </View>
    </TouchableHighlight>
  );
};

export default observer(Balance);
