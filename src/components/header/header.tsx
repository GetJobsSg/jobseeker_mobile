import React from 'react';
import { View } from 'react-native';
import { HeaderProps } from './header.props';
import { presets } from './header.presets';

const Header = (props: HeaderProps) => {
  const { preset = 'default', leftIcon, rightIcons, rightLabel } = props;
  const headerStyle = presets[preset];

  const renderRigtContent = () => {
    if (rightLabel) return rightLabel;
    if (rightIcons) {
      return rightIcons.map((icon, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={key}>{icon}</View>
      ));
    }
    return null;
  };

  return (
    <View style={headerStyle.container}>
      <View style={headerStyle.leftContainer}>{leftIcon}</View>
      <View style={headerStyle.rightContainer}>{renderRigtContent()}</View>
    </View>
  );
};

export default Header;
