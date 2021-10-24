import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../themes';

interface ISafeArea {
  children: React.ReactNode | React.ReactNode[];
}

const SafeArea: React.FC<ISafeArea> = (props: ISafeArea) => {
  const { children } = props;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>{children}</SafeAreaView>;
};

export default SafeArea;
