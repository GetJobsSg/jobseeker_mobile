import React from 'react';
import { ScrollView, StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from './screen.props';
import { presets } from './screen.presets';
import { colors } from '../../themes';

const isIOS = Platform.OS === 'ios';
const avoidViewBehaviour = isIOS ? 'padding' : undefined;

const Screen = (props: ScreenProps) => {
  const { children, preset = 'scroll', refreshControl, withContainer = true, unsafeArea = ['top'] } = props;
  const { outer, inner } = presets[preset];

  const containerStyle = withContainer ? inner : outer;

  const ScreenWrapper = unsafeArea === null || unsafeArea.length === 0 ? View : SafeAreaView;

  if (preset === 'scroll') {
    return (
      <ScreenWrapper style={[outer]} edges={unsafeArea || []}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <KeyboardAvoidingView behavior={avoidViewBehaviour} style={[outer]}>
          <View style={[outer]}>
            <ScrollView refreshControl={refreshControl} style={[containerStyle]}>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={[outer]} edges={unsafeArea || []}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <KeyboardAvoidingView behavior={avoidViewBehaviour} style={[outer]}>
        <View style={[containerStyle]}>{children}</View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Screen;
