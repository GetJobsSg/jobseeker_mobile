import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import moment from 'moment';
import { withErrorHandler } from './extensions';
import { IInboxMessage } from '../constants/types';
import { DD_MMM, DD_MMMM_YYYY_HOUR_MIN_A } from '../constants/dateTime';
import * as apis from '../apis';
import { constructDateRange } from '../utils/dateTime';

const MessageStore = types.model({
  id: types.optional(types.number, 0),
  title: types.optional(types.string, ''),
  body: types.optional(types.string, ''),
  type: types.optional(types.number, IInboxMessage.JOB_OFFER),
  jobId: types.maybeNull(types.number),
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

    inboxDetails: types.optional(MessageStore, {}),
    isLoadingInboxDetails: types.optional(types.boolean, false),
    errorInboxDetails: types.optional(types.string, ''),
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
    getInboxDetails: flow(function* getInboxDetails(id: number) {
      try {
        self.isLoadingInboxDetails = true;
        const res = yield* toGenerator(apis.getInboxDetails(id));
        const { data } = res;
        self.inboxDetails.id = data.id;
        self.inboxDetails.title = data.title;
        self.inboxDetails.body = data.body;
        self.inboxDetails.type = data.inbox_message_type.id;
        self.inboxDetails.jobId = data.job_id;
        self.inboxDetails.title = data.title;
        self.inboxDetails.jobId = data.job_id;
        self.inboxDetails.dateReceived = moment(data.date_created).format(DD_MMM);
        self.inboxDetails.fullDateReceived = moment(data.date_created).format(DD_MMMM_YYYY_HOUR_MIN_A);
        self.inboxDetails.seen = data.seen;
      } catch (e) {
        self.errorInboxDetails = self.getErrMsg(e);
      } finally {
        self.isLoadingInboxDetails = false;
      }
    }),
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
