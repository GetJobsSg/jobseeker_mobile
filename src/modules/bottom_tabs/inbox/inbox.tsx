import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { Screen, Spinner, Text } from '../../../components';
import InboxItem from './inbox-item';
import { useMst } from '../../../store';
import { Message } from '../../../store/inbox';

const InboxScreen = () => {
  const {
    authStore: { isAuthenticated },
    inboxStore: { getInboxMessages, inboxMessages, isLoadingInbox },
  } = useMst();

  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getInboxMessages();
    }
  }, [isAuthenticated, getInboxMessages]);

  const handleRefresh = () => {
    setRefreshing(true);
    getInboxMessages().finally(() => setRefreshing(false));
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => (
    <InboxItem
      id={item.id}
      title={item.title}
      body={item.body}
      dateReceived={item.dateReceived}
      fullDateReceived={item.fullDateReceived}
      seen={item.seen}
      type={item.type}
      jobId={item.jobId}
    />
  );

  if (isLoadingInbox && !isRefreshing) return <Spinner preset="center" />;

  return (
    <Screen preset="fixed">
      <FlatList
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        ListHeaderComponent={<Text preset="header">Inbox</Text>}
        data={inboxMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Screen>
  );
};

export default observer(InboxScreen);
