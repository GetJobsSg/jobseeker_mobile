import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { IInboxMessage } from '../constants/types';
import * as apis from '../apis';

const MessageStore = types.model({
  id: types.optional(types.number, 0),
  title: types.optional(types.string, ''),
  body: types.optional(types.string, ''),
  type: types.optional(types.number, IInboxMessage.JOB_OFFER),
  jobId: types.maybe(types.number),
  dateReceived: types.optional(types.string, ''),
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

        // todo: add types
        res.data.forEach((item: any) => {
          self.inboxMessages.push({
            id: item.id,
            title: item.title,
            body: item.body,
            jobId: item.job_id,
            type: item.inbox_message_type.id || IInboxMessage.JOB_OFFER,
            dateReceived: item.date_created,
          });
        });
      } catch (e) {
        self.errorInboxMessages = self.getErrMsg(e);
      } finally {
        self.isLoadingInbox = false;
      }
    }),
  }));

type InboxStoreInstance = Instance<typeof InboxStore>;
export interface Inbox extends InboxStoreInstance {}

type InboxStoreSnapshotType = SnapshotOut<typeof InboxStore>;
export interface InboxStoreSnapshot extends InboxStoreSnapshotType {}
