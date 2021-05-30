import React from 'react';
import { ScrollView, StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from './screen.props';
import { presets } from './screen.presets';
import { colors } from '../../themes';

const isIOS = Platform.OS === 'ios';
const avoidViewBehaviour = isIOS ? 'padding' : undefined;

const Screen = (props: ScreenProps) => {
  const { children, preset = 'scroll', refreshControl } = props;
  const { outer, inner } = presets[preset];

  if (preset === 'scroll') {
    return (
      <SafeAreaView style={[outer]} edges={['top']}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <KeyboardAvoidingView behavior={avoidViewBehaviour} style={[outer]}>
          <View style={[outer]}>
            <ScrollView refreshControl={refreshControl} style={[inner]}>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[outer]} edges={['top']}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <KeyboardAvoidingView behavior={avoidViewBehaviour} style={[outer]}>
        <View style={[inner]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Screen;
