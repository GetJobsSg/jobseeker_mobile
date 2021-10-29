import React from 'react';
import { View } from 'react-native';
import { SafeArea } from '../..';
import { spacing } from '../../../themes';
import { IFixedScreenProps } from './fixed-screen.props';

const FixedScreen: React.FC<IFixedScreenProps> = (props: IFixedScreenProps) => {
  const { children, appBar, px = spacing.lg } = props;

  return (
    <SafeArea style={{ flex: 1 }} edges={['top']}>
      <View>{appBar}</View>
      <View style={{ flex: 1, paddingHorizontal: px }}>{children}</View>
    </SafeArea>
  );
};

export default FixedScreen;
