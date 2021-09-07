import React, { useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, ListRenderItem, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import { Text, Row, Header, Screen, IconButton, Card, Button } from '../../../components';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { BankAccountInfo } from '../../../store/bank-account-info';

const WithdrawalScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    bankAccountStore: { getBankAccounts, bankAccounts, isLoading },
  } = useMst();

  const fetchData = useCallback(() => {
    if (isAuthenticated) {
      getBankAccounts();
    }
  }, [isAuthenticated, getBankAccounts]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  const onSelectBankAccount = (id: number) => () => {
    navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_bank_accountDetails, params: { id } });
  };

  const onSelectAddBankAccount = () => {
    navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_add_edit_bank_account, params: { id: 0 } });
  };

  const renderItem: ListRenderItem<BankAccountInfo> = ({ item }) => (
    <Card style={{ marginBottom: spacing.md }} onPress={onSelectBankAccount(item.id)}>
      <Row>
        <Text preset="title2" style={{ flex: 1 }}>
          {item.bank.name}
        </Text>
        <Text preset="bold" style={{ color: colors.darkBlue0 }}>
          {item.isPrimary ? 'Primary' : ''}
        </Text>
      </Row>
      <Text preset="hint">{item.accountNo}</Text>
    </Card>
  );

  return (
    <Screen preset="fixed" refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}>
      <Header title="Withdraw" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      <Text preset="header" style={{ marginBottom: 20 }}>
        Select a Bank Account
      </Text>
      <FlatList data={bankAccounts.slice()} renderItem={renderItem} />
      <Button block label="Add Account" onPress={() => onSelectAddBankAccount()} />

      <View style={{ marginVertical: 20 }} />
    </Screen>
  );
};

export default observer(WithdrawalScreen);
