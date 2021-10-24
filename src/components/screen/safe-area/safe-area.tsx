import React from 'react';
import { SafeAreaView, NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { colors } from '../../../themes';

interface ISafeArea extends NativeSafeAreaViewProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

const SafeArea: React.FC<ISafeArea> = (props: ISafeArea) => {
  const { children, bgColor = colors.white, ...rest } = props;
  return (
    <SafeAreaView {...rest} style={{ flex: 1, backgroundColor: bgColor }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
