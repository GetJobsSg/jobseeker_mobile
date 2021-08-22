import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spinner, Text, LoginMessage } from '../../../components';
import InboxItem from './inbox-item';
import { useMst } from '../../../store';
import { Message } from '../../../store/inbox';
import { colors, spacing } from '../../../themes';

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
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.white, flex: 1 }}>
      {isAuthenticated ? (
        <View>
          <Text style={{ paddingHorizontal: spacing.md }} preset="header">
            Inbox
          </Text>
          <FlatList
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
            data={inboxMessages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <View>
          <LoginMessage />
        </View>
      )}
    </SafeAreaView>
  );
};

export default observer(InboxScreen);
