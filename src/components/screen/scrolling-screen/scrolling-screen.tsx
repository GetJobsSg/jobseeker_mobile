import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeArea } from '../..';
import { colors, spacing } from '../../../themes';
import { IScrollingScreenProps } from './scrolling-screen.props';

const ScrollingScreen: React.FC<IScrollingScreenProps> = (props: IScrollingScreenProps) => {
  const { children, appBar, scrollViewProps, px = spacing.lg } = props;
  return (
    <SafeArea>
      {appBar}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: colors.white }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.white }}
          contentContainerStyle={{ paddingHorizontal: px }}
          {...scrollViewProps}
        >
          <View>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default ScrollingScreen;
