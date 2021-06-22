import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Routes } from '../../../navigator/routes';
import { Text } from '../../../components';

interface InboxItemProps {
  title: string;
  body: string;
  jobId?: number;
}
const InboxItem = (props: InboxItemProps) => {
  const { title, body, jobId } = props;
  const navigation = useNavigation();

  const handleOnPress = () => {
    // route user to offer details page
    if (jobId) {
      navigation.navigate(Routes.job_stack, { screen: Routes.job_offer_details, params: { id: jobId } });
    }
  };

  return (
    <TouchableOpacity style={{ marginBottom: 10 }} onPress={handleOnPress}>
      <Text preset="title3">{title}</Text>
      <Text preset="hint">{body}</Text>
    </TouchableOpacity>
  );
};

export default InboxItem;
