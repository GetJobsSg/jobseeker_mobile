import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors } from '../themes';
import { useMst } from '../store';

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider = (props: DataProviderProps) => {
  const { children } = props;
  const {
    dataStore: { initData, isLoading },
  } = useMst();

  useEffect(() => {
    // initData();
  }, [initData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <>{children}</>;
};

export default observer(DataProvider);
