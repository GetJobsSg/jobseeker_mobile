import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Routes } from '../../../navigator/routes';
import { Text, Row, Icon, Touchable } from '../../../components';

interface InboxItemProps {
  title: string;
  body: string;
  jobId?: number;
  dateReceived: string;
}
const InboxItem = (props: InboxItemProps) => {
  const { title, body, jobId, dateReceived } = props;
  const navigation = useNavigation();

  const handleOnPress = () => {
    // route user to offer details page
    if (jobId) {
      navigation.navigate(Routes.job_stack, { screen: Routes.job_offer_details, params: { id: jobId } });
    }
  };

  return (
    <Touchable onPress={handleOnPress}>
      <Row style={{ marginBottom: 25 }}>
        <Icon
          icon="inbox_message"
          containerStyle={{ backgroundColor: 'rgba(70,0,70,0.4)', borderRadius: 30, padding: 10 }}
          size={30}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Row>
            <Text preset="title3" numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>
              {title}
            </Text>
            <Text preset="title3" style={{ marginLeft: 5, fontWeight: 'bold' }}>
              {dateReceived}
            </Text>
          </Row>
          <Text preset="hint" numberOfLines={2}>
            {body}
          </Text>
        </View>
      </Row>
    </Touchable>
  );
};

export default InboxItem;
