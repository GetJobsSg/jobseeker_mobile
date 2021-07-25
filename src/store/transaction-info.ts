import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { TransactionType } from '../constants/types';
import { DD_MMMM_YYYY_HOUR_MIN_A } from '../constants/dateTime';
import { constructDateRange } from '../utils/dateTime';

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
  job_id: number | null;
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
    jobId: types.maybeNull(types.number),
    dateCreated: types.optional(types.string, ''),
  })
  .views((self) => ({
    get isPositiveAmount() {
      return !!(self.type === TransactionType.SALARY || self.type === TransactionType.CREDIT);
    },
    get formattedAmount() {
      const sign = self.type === TransactionType.SALARY || self.type === TransactionType.CREDIT ? '+' : '-';
      return `${sign} S$ ${self.amount.toFixed(2)}`;
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
  .extend(withErrorHandler);

type TransactionInfoStoreInstance = Instance<typeof TransactionInfoStore>;
export interface TransactionInfo extends TransactionInfoStoreInstance {}

type TransactionInfoStoreSnapshotType = SnapshotOut<typeof TransactionInfoStore>;
export interface TransactionInfoStoreSnapshot extends TransactionInfoStoreSnapshotType {}
