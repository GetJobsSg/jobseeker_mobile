import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { View, TouchableOpacity, TextStyle } from 'react-native';
import { Routes } from '../../../navigator/routes';
import { Text, Row, Icon } from '../../../components';

interface InboxItemProps {
  id: number;
  title: string;
  body: string;
  dateReceived: string;
  fullDateReceived: string;
  seen: boolean;
  type: number;
  jobId: number | null;
}
const InboxItem = (props: InboxItemProps) => {
  const { id, title, body, dateReceived, fullDateReceived, seen, jobId, type } = props;
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(Routes.inbox_stack, {
      screen: Routes.inbox_details,
      params: { id, title, body, seen, type, fullDateReceived, jobId },
    });
    // navigation.navigate(Routes.job_stack, { screen: Routes.job_offer_details, params: { id: 1 } });
  };

  const boldTitleHeader = seen ? null : ({ fontWeight: 'bold' } as TextStyle);

  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.6}>
      <Row style={{ marginBottom: 25 }}>
        <Icon
          icon="inbox_message"
          containerStyle={{ backgroundColor: 'rgba(70,0,70,0.4)', borderRadius: 30, padding: 10 }}
          size={30}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Row>
            <Text preset="title3" numberOfLines={1} style={[{ flex: 1 }, boldTitleHeader]}>
              {title}
            </Text>
            <Text preset="title3" style={[{ marginLeft: 5 }, boldTitleHeader]}>
              {dateReceived}
            </Text>
          </Row>
          <Text preset="hint" numberOfLines={2}>
            {body}
          </Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default observer(InboxItem);
