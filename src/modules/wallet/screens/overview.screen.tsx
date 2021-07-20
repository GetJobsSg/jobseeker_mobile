import React, { useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Text, Header, Screen, IconButton } from '../../../components';
import { colors, fontSize, spacing } from '../../../themes';
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
    <Screen preset="scroll" addHorizontalPadding={false}>
      <Header
        title="Wallet"
        leftIcon={
          <IconButton icon="circle_back_btn" style={commonStyles.SAFE_PADDING} onPress={() => navigation.goBack()} />
        }
      />

      <View
        style={[
          commonStyles.SAFE_PADDING,
          {
            backgroundColor: colors.primary,
            marginRight: 40,
            paddingTop: spacing.lg,
            paddingBottom: spacing.lg,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}
      >
        <Text style={{ color: colors.white, fontSize: fontSize.xxs }}>Wallet Balance</Text>
        <Text style={{ marginTop: 5, marginBottom: 0, color: colors.white }} preset="header">
          {formattedAmountDollar}
        </Text>
      </View>

      <View style={[commonStyles.SAFE_PADDING, { marginTop: 20 }]}>
        <Text preset="title2">Transactions</Text>
      </View>
    </Screen>
  );
};

export default observer(WalletOverviewScreen);
