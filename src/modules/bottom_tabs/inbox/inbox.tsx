import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FixedScreen, Spinner, Text, LoginMessage } from '../../../components';
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
    <InboxItem id={item.id} title={item.title} body={item.body} dateReceived={item.dateReceived} seen={item.seen} />
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.white, flex: 1 }}>
        <View>
          <LoginMessage />
        </View>
      </SafeAreaView>
    );
  }

  if (isLoadingInbox && !isRefreshing) return <Spinner preset="center" />;

  return (
    <FixedScreen
      appBar={
        <Text style={{ paddingHorizontal: spacing.md }} preset="header">
          Inbox
        </Text>
      }
      px={0}
    >
      {inboxMessages.length === 0 ? (
        <Text style={{ paddingHorizontal: spacing.md }}>No Message</Text>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          data={inboxMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </FixedScreen>
  );
};

export default observer(InboxScreen);
