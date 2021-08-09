import React, { useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Text, Header, Screen, IconButton } from '../../../components';
import { useMst } from '../../../store';

const AddBankAccountScreen = () => {
  const navigation = useNavigation();
  const {
    authStore: { isAuthenticated },
    walletStore: { getWallet, isLoading },
  } = useMst();

  const fetchData = useCallback(() => {
    if (isAuthenticated) {
      getWallet();
    }
  }, [isAuthenticated, getWallet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <Screen preset="scroll" refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}>
      <Header title="Withdraw" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      <Text preset="header" style={{ marginBottom: 20 }}>
        Select a Bank Account
      </Text>
    </Screen>
  );
};

export default observer(AddBankAccountScreen);
