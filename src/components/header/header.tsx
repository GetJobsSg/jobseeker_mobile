import React from 'react';
import { View } from 'react-native';
import { HeaderProps } from './header.props';
import { presets } from './header.presets';
import { Text } from '..';

const Header = (props: HeaderProps) => {
  const { preset = 'default', leftIcon, title = '', rightIcons, rightLabel, style: containerStyle, color } = props;
  const headerStyle = presets[preset];

  const renderRightContent = () => {
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
    <View style={[headerStyle.container, containerStyle]}>
      <View style={headerStyle.leftContainer}>{leftIcon}</View>
      <View style={headerStyle.titleContainer}>
        <Text style={[headerStyle.title, color ? { color } : null]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={headerStyle.rightContainer}>{renderRightContent()}</View>
    </View>
  );
};

export default Header;
