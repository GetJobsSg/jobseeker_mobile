import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '..';
import { IconButtonProps } from './icon-button.props';

const IconButton = (props: IconButtonProps) => {
  const { icon, size = 32, onPress, style: overrideIconBtnStyle } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[overrideIconBtnStyle]}>
      <Icon style={{ width: size, height: size }} icon={icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
