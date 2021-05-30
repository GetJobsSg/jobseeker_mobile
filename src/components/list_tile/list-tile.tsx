import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, Text } from '..';
import { CONTAINER, CONTENT, LEFT_WRAPPER } from './list-tile.styles';
import { ListTileProps } from './list-tile.props';

const ICON_SIZE = 30;

const ListTile = (props: ListTileProps) => {
  const { leadingIcon, title, description, traillingIcons } = props;

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={[CONTAINER]}>
        <View style={[LEFT_WRAPPER]}>
          {leadingIcon && <Icon size={ICON_SIZE} icon={leadingIcon} />}

          <View style={CONTENT}>
            <Text>{title}</Text>
            {description && (
              <Text preset="hint" style={{ fontWeight: '300' }}>
                {description}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {traillingIcons && traillingIcons.map((icon) => <Icon size={ICON_SIZE} key={icon} icon={icon} />)}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListTile;
