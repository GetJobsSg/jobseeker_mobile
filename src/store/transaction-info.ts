import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { TransactionType } from '../constants/types';
import { DD_MMMM_YYYY_HOUR_MIN_A } from '../constants/dateTime';
import { constructDateRange } from '../utils/dateTime';
import { JobInfoStore } from './job-info';
import { JobInfo } from '../modules/job/types';
import * as apis from '../apis';

type TransactionTypeResponse = {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
};

export type TransactionInfoResponse = {
  id: number;
  type: number;
  amount: number;
  comment: string;
  is_approved: boolean | null;
  wallet_id: number | null;
  job: JobInfo | null;
  transaction_type: TransactionTypeResponse;
  date_updated: string;
  date_created: string;
};

export const TransactionInfoStore = types
  .model('TransactionInfoStore')
  .props({
    id: types.optional(types.number, 0),
    type: types.optional(types.number, TransactionType.SALARY),
    typeName: types.optional(types.string, ''),
    amount: types.optional(types.number, 0),
    comment: types.optional(types.string, ''),
    isApproved: types.maybeNull(types.boolean),
    walletId: types.maybeNull(types.number),
    job: types.maybeNull(JobInfoStore),
    dateCreated: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .views((self) => ({
    get isPositiveAmount() {
      return !!(self.type === TransactionType.SALARY || self.type === TransactionType.CREDIT);
    },
    get formattedAmount() {
      const sign = self.type === TransactionType.SALARY || self.type === TransactionType.CREDIT ? '+' : '-';
      return `${sign} S$ ${self.amount.toFixed(2)}`;
    },
    get formattedAmountWithoutSign() {
      return `S$ ${self.amount.toFixed(2)}`;
    },
    get formattedDate() {
      return constructDateRange(self.dateCreated, self.dateCreated, DD_MMMM_YYYY_HOUR_MIN_A);
    },
    get approvalStatus() {
      switch (self.isApproved) {
        case true:
          return 'Approved';
          break;
        case false:
          return 'Rejected';
          break;
        default:
          return 'Pending';
          break;
      }
    },
  }))
  .actions((self) => ({
    getTransactionDetails: flow(function* getTransactionDetails(id: number) {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getTransactionDetails(id));

        if (!res?.data) return;

        const { data } = res;

        self.id = data.id;
        self.type = data.transaction_type.id;
        self.typeName = data.transaction_type.name;
        self.amount = data.amount;
        self.comment = data.comment;
        self.isApproved = data.is_approved;
        self.walletId = data.wallet_id;
        self.job = data.job;
        self.dateCreated = data.date_created;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type TransactionInfoStoreInstance = Instance<typeof TransactionInfoStore>;
export interface TransactionInfo extends TransactionInfoStoreInstance {}

type TransactionInfoStoreSnapshotType = SnapshotOut<typeof TransactionInfoStore>;
export interface TransactionInfoStoreSnapshot extends TransactionInfoStoreSnapshotType {}
