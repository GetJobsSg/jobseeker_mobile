import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { IInboxMessage } from '../constants/types';
import { DD_MMMM_YYYY_HOUR_MIN_A } from '../constants/dateTime';
import * as apis from '../apis';
import { constructDateRange } from '../utils/dateTime';

const MessageStore = types.model({
  id: types.optional(types.number, 0),
  title: types.optional(types.string, ''),
  body: types.optional(types.string, ''),
  type: types.optional(types.number, IInboxMessage.JOB_OFFER),
  jobId: types.optional(types.number, 0),
  dateReceived: types.optional(types.string, ''),
  fullDateReceived: types.optional(types.string, ''),
  seen: types.optional(types.boolean, false),
});
export interface Message extends Instance<typeof MessageStore> {}

export const InboxStore = types
  .model('InboxStore')
  .props({
    inboxMessages: types.optional(types.array(MessageStore), []),
    isLoadingInbox: types.optional(types.boolean, false),
    errorInboxMessages: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions((self) => ({
    getInboxMessages: flow(function* getInboxMessages() {
      try {
        self.isLoadingInbox = true;
        const res = yield* toGenerator(apis.getInbox());

        self.inboxMessages.clear();

        res.data.forEach((item: any) => {
          self.inboxMessages.push({
            id: item.id,
            title: item.title,
            body: item.body,
            jobId: item.job_id || 0,
            type: item.inbox_message_type !== null ? item.inbox_message_type.id : null || IInboxMessage.JOB_OFFER,
            dateReceived: constructDateRange(item.date_created, item.date_created),
            fullDateReceived: constructDateRange(item.date_created, item.date_created, DD_MMMM_YYYY_HOUR_MIN_A),
            seen: item.seen,
          });
        });
      } catch (e) {
        self.errorInboxMessages = self.getErrMsg(e);
      } finally {
        self.isLoadingInbox = false;
      }
    }),
  }))
  .actions((self) => ({
    updateSeenReceipt: flow(function* updateSeenReceipt(id: number) {
      try {
        yield* toGenerator(apis.updateSeenReceipt(id));
        yield self.getInboxMessages();
      } catch (e) {
        self.errorInboxMessages = self.getErrMsg(e);
      }
    }),
  }));

type InboxStoreInstance = Instance<typeof InboxStore>;
export interface Inbox extends InboxStoreInstance {}

type InboxStoreSnapshotType = SnapshotOut<typeof InboxStore>;
export interface InboxStoreSnapshot extends InboxStoreSnapshotType {}
