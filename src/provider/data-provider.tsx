import React from 'react';
// import React, { useEffect } from 'react';
// import { ActivityIndicator, View } from 'react-native';
import { observer } from 'mobx-react-lite';
// import { colors } from '../themes';
// import { useMst } from '../store';

interface DataProviderProps {
  children: React.ReactNode;
}

// keep the file, we might need this in future
// no logic is being handle and it's just a wrapper for now
const DataProvider = (props: DataProviderProps) => {
  const { children } = props;
  // const {
  //   dataStore: { initData, isLoading },
  // } = useMst();

  // useEffect(() => {
  //   // initData();
  // }, [initData]);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator color={colors.primary} />
  //     </View>
  //   );
  // }

  return <>{children}</>;
};

export default observer(DataProvider);
