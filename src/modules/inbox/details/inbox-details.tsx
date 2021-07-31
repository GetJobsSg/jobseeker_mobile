import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Header, Text, Screen, IconButton } from '../../../components';
import { Routes } from '../../../navigator/routes';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';

type InboxParamsList = {
  [Routes.inbox_details]: {
    id: number;
    title: string;
    body: string;
    dateReceived: string;
    fullDateReceived: string;
    seen: boolean;
  };
};

export type InboxDetailsProps = RouteProp<InboxParamsList, Routes.inbox_details>;

const InboxDetails = () => {
  const navigation = useNavigation();

  const {
    authStore: { isAuthenticated },
    inboxStore: { updateSeenReceipt },
  } = useMst();

  const {
    params: { id, title, body, seen, fullDateReceived },
  } = useRoute<InboxDetailsProps>();

  useEffect(() => {
    if (isAuthenticated) {
      if (!seen) {
        updateSeenReceipt(id);
      }
    }
  }, [isAuthenticated, updateSeenReceipt]);

  return (
    <Screen preset="fixed">
      <Header title="Message" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />

      <Text preset="title2" style={{ marginTop: spacing.md }}>
        {title}
      </Text>

      <View style={{ height: 2, backgroundColor: colors.lightGrey1, marginTop: 20, marginBottom: 20 }} />

      <Text>{body}</Text>

      <Text preset="hint" style={{ marginTop: spacing.xl }}>
        {fullDateReceived}
      </Text>
    </Screen>
  );
};

export default observer(InboxDetails);
