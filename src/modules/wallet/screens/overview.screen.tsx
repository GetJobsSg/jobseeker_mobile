import React, { useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Text, Header, Screen, IconButton } from '../../../components';
import { useMst } from '../../../store';
import { commonStyles } from '../../../common';

const WalletOverviewScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    walletStore: { getWallet, formattedAmountDollar },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getWallet();
    }
  }, [isAuthenticated, getWallet]);

  return (
    <Screen>
      <Header title="Wallet" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />

      <View style={commonStyles.CARD_VIEW}>
        <Text>Wallet Balance</Text>
        <Text style={{ marginTop: 5, marginBottom: 0 }} preset="header">
          {formattedAmountDollar}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>All Transaction</Text>
      </View>
    </Screen>
  );
};

export default observer(WalletOverviewScreen);
