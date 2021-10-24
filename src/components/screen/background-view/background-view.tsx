import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../themes';
import { SafeArea } from '../..';
import { BackgroundViewProps } from './background-view.props';
import { BG_VIEW_CONTAINER, TOP_BG_LAYER } from './background-view.styles';

const BackgroundView = (props: BackgroundViewProps) => {
  const { bgColor = colors.primary, children, scrollViewProps, safeAreaProps } = props;
  return (
    <SafeArea bgColor={bgColor} edges={['top']} {...safeAreaProps}>
      <StatusBar barStyle="light-content" />
      <View style={BG_VIEW_CONTAINER}>
        <View style={[TOP_BG_LAYER, { backgroundColor: bgColor }]} />
        <ScrollView contentContainerStyle={{ backgroundColor: colors.white, flex: 1 }} {...scrollViewProps}>
          {children}
        </ScrollView>
      </View>
    </SafeArea>
  );
};

export default BackgroundView;
