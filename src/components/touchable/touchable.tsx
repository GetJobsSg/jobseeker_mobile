import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { colors } from '../../themes';
import { TouchableProps } from './touchable.props';

const isAndroid = Platform.OS === 'android';

const Touchable = (props: TouchableProps) => {
  const { children, onPress, style } = props;
  if (isAndroid)
    return (
      <TouchableNativeFeedback style={style} onPress={onPress}>
        {children}
      </TouchableNativeFeedback>
    );

  return (
    <TouchableHighlight style={style} underlayColor={colors.lightGrey2} onPress={onPress}>
      {children}
    </TouchableHighlight>
  );
};

export default Touchable;
