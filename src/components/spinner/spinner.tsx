import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors } from '../../themes';
import { presets } from './spinner.presets';
import { SpinnerProps } from './spinner.props';
import { useMst } from '../../store';

const Spinner = (props: SpinnerProps) => {
  const { preset = 'global' } = props;
  const containerStyle = presets[preset];

  const {
    uiStore: { isGlobalLoading },
  } = useMst();

  if (!isGlobalLoading) return null;

  return (
    <View style={containerStyle}>
      <ActivityIndicator color={colors.primary} size="small" />
    </View>
  );
};

export default observer(Spinner);
