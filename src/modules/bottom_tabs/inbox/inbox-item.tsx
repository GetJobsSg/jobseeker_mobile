import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { View, TouchableOpacity, TextStyle } from 'react-native';
import { Routes } from '../../../navigator/routes';
import { Text, Row, Icon } from '../../../components';
import { colors, spacing } from '../../../themes';

interface InboxItemProps {
  id: number;
  title: string;
  body: string;
  dateReceived: string;
  seen: boolean;
}
const InboxItem = (props: InboxItemProps) => {
  const { id, title, body, dateReceived, seen } = props;
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(Routes.inbox_stack, {
      screen: Routes.inbox_details,
      params: { id },
    });
  };

  const messageTitleStyle = seen
    ? ({ fontWeight: '400', color: colors.textSecondary } as TextStyle)
    : ({ fontWeight: 'bold' } as TextStyle);

  const messageBodyStyle = seen
    ? ({ fontWeight: '300', color: colors.textSecondary } as TextStyle)
    : ({ fontWeight: '400', color: colors.black } as TextStyle);

  return (
    <TouchableOpacity style={{ padding: spacing.md }} onPress={handleOnPress} activeOpacity={0.6}>
      <Row style={{ marginBottom: 0 }}>
        <Icon
          icon="inbox_message"
          containerStyle={{ backgroundColor: 'rgba(70,0,70,0.4)', borderRadius: 30, padding: 10 }}
          size={30}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Row>
            <Text preset="title3" numberOfLines={1} style={[{ flex: 1 }, messageTitleStyle]}>
              {title}
            </Text>
            <Text preset="title3" style={[{ marginLeft: 5 }, messageTitleStyle]}>
              {dateReceived}
            </Text>
          </Row>
          <Text preset="hint" numberOfLines={2} style={[messageBodyStyle]}>
            {body}
          </Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default observer(InboxItem);
