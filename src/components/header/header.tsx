import React from 'react';
import { View } from 'react-native';
import { HeaderProps } from './header.props';
import { presets } from './header.presets';

const Header = (props: HeaderProps) => {
  const { preset = 'default', leftIcon, rightIcons } = props;
  const headerStyle = presets[preset];

  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.leftContainer}>{leftIcon}</View>

      <View style={headerStyle.rightContainer}>
        {rightIcons &&
          rightIcons.map((icon, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={key}>{icon}</View>
          ))}
      </View>
    </View>
  );
};

export default Header;
