import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react-lite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import { Text, Header, IconButton, Button } from '../../../components';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { commonStyles } from '../../../common';
import { WalletBankAccountDetailProps } from '../types';

const BankAccountDetailScreen = () => {
  const navigation = useNavigation<any>();
  const {
    params: { id },
  } = useRoute<WalletBankAccountDetailProps>();

  const {
    authStore: { isAuthenticated },
    walletStore: { withdraw, isLoading },
    bankAccountInfoStore: { getBankAccount, accountNo, bank },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getBankAccount(id);
    }
  }, [isAuthenticated, id, getBankAccount]);

  const onSelectWithdraw = () => {
    withdraw(id);
    navigation.popToTop();
  };

  const onSelectEdit = () => {
    navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_add_edit_bank_account, params: { id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        title="Withdraw"
        style={commonStyles.SAFE_PADDING}
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        rightLabel={<Text onPress={() => onSelectEdit()}>Edit</Text>}
      />

      <ScrollView style={commonStyles.SAFE_PADDING}>
        <Text preset="title2" style={{ color: colors.textSecondary }}>
          Account No.
        </Text>
        <Text preset="header" style={{ marginTop: 0, marginBottom: 30 }}>
          {accountNo}
        </Text>

        <Text preset="labelTiny">Bank</Text>
        <Text>{bank.name}</Text>

        <Text preset="labelTiny" style={{ marginTop: spacing.sm }}>
          Code
        </Text>
        <Text>{bank.code}</Text>
      </ScrollView>

      <View style={commonStyles.STICKY_BOTTOM}>
        <Button block disabled={isLoading} label="Withdraw" onPress={() => onSelectWithdraw()} />
      </View>
    </SafeAreaView>
  );
};

export default observer(BankAccountDetailScreen);
