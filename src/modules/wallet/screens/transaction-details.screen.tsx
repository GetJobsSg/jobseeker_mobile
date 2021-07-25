import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Screen, IconButton } from '../../../components';
import { commonStyles } from '../../../common';

const TransactionDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen preset="scroll" addHorizontalPadding={false}>
      <Header
        leftIcon={
          <IconButton icon="circle_back_btn" style={commonStyles.SAFE_PADDING} onPress={() => navigation.goBack()} />
        }
      />
    </Screen>
  );
};

export default TransactionDetailScreen;
