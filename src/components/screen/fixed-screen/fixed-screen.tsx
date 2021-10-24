import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Platform, View, Keyboard } from 'react-native';
import { SafeArea } from '../..';
import { colors, spacing } from '../../../themes';
import { IFixedScreenProps } from './fixed-screen.props';

const FixedScreen: React.FC<IFixedScreenProps> = (props: IFixedScreenProps) => {
  const { children, appBar } = props;

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeArea>
      {appBar}
      <TouchableWithoutFeedback onPress={handleDismissKeyboard} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, backgroundColor: colors.white }}
        >
          <View style={{ paddingHorizontal: spacing.lg }}>{children}</View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeArea>
  );
};

export default FixedScreen;
