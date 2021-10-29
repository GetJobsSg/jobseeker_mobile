import React, { useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, ListRenderItem } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import { Text, Header, FixedScreen, Icon, IconButton, Touchable, Row, ScrollingScreen } from '../../../components';
import { colors, fontSize, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { commonStyles } from '../../../common';
import { TransactionInfo } from '../../../store/transaction-info';

const WalletOverviewScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    walletStore: { getWallet, formattedAmountDollar },
    transactionStore: { getAllTransactions, transactions, isLoading },
  } = useMst();

  const fetchData = useCallback(() => {
    if (isAuthenticated) {
      getWallet();
      getAllTransactions();
    }
  }, [isAuthenticated, getWallet, getAllTransactions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  const onSelectTransaction = (id: number) => () => {
    navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_transactionDetails, params: { id } });
  };

  const renderItem: ListRenderItem<TransactionInfo> = ({ item }) => (
    <Touchable onPress={onSelectTransaction(item.id)}>
      <View style={[commonStyles.SAFE_PADDING, { paddingVertical: spacing.md }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <View>
            <Text preset="bold">{item.typeName}</Text>
          </View>
          <Text style={{ color: item.isPositiveAmount ? colors.textSuccess : colors.textWarning }}>
            {item.formattedAmount}
          </Text>
        </View>
        {item.comment.length > 0 && <Text preset="hint">{item.comment}</Text>}
        <Text preset="hint">{item.formattedDate}</Text>
      </View>
    </Touchable>
  );

  const renderWalletBalance = () => (
    <>
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
        <Row>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.white, fontSize: fontSize.xxs }}>Wallet Balance</Text>
            <Row>
              <Text style={{ flex: 1, marginTop: 5, marginBottom: 0, color: colors.white }} preset="header">
                {formattedAmountDollar}
              </Text>
            </Row>
          </View>
          <Touchable onPress={() => navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_withdrawal })}>
            <View>
              <Row style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text preset="bold" style={{ fontSize: fontSize.xs, color: colors.white, paddingRight: spacing.xs }}>
                  Withdraw
                </Text>
                <Icon icon="ic_arrow_right_primary" style={{ tintColor: colors.white }} />
              </Row>
            </View>
          </Touchable>
        </Row>
      </View>
      <Text preset="title2" style={[commonStyles.SAFE_PADDING, { marginTop: 20, marginBottom: 10 }]}>
        Transactions
      </Text>
    </>
  );

  if (transactions.length === 0) {
    return (
      <ScrollingScreen
        appBar={
          <Header title="Wallet" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
        }
        px={0}
        scrollViewProps={{ refreshControl: <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} /> }}
      >
        {renderWalletBalance()}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.lightGrey1,
            backgroundColor: colors.lightGrey0,
            padding: 10,
            paddingVertical: 20,
            borderRadius: 15,
            marginHorizontal: 15,
          }}
        >
          <Text style={{ color: colors.lightGrey2, fontWeight: 'bold' }}>You have no transaction history</Text>
        </View>
      </ScrollingScreen>
    );
  }

  return (
    <FixedScreen
      px={0}
      appBar={
        <Header title="Wallet" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      }
    >
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        ListHeaderComponent={renderWalletBalance()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
        data={transactions}
        renderItem={renderItem}
      />
    </FixedScreen>
  );
};

export default observer(WalletOverviewScreen);
