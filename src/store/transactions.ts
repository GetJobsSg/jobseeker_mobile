import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { TransactionInfo, TransactionInfoStore, TransactionInfoResponse } from './transaction-info';
import * as apis from '../apis';

export const TransactionStore = types
  .model('TransactionStore')
  .props({
    transactions: types.optional(types.array(TransactionInfoStore), []),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions(() => ({
    transformToState(data: TransactionInfoResponse): Partial<TransactionInfo> {
      return {
        id: data.id,
        type: data.transaction_type.id,
        typeName: data.transaction_type.name,
        amount: data.amount,
        comment: data.comment,
        isApproved: data.is_approved,
        walletId: data.wallet_id,
        jobId: data.job_id,
        dateCreated: data.date_created,
      };
    },
  }))
  .actions((self) => ({
    getAllTransactions: flow(function* getAllTransactions() {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getAllTransactions());
        self.transactions.clear();

        if (!res?.data) return;

        res.data.forEach((item: TransactionInfoResponse) => {
          self.transactions.push(self.transformToState(item));
        });
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type TransactionStoreInstance = Instance<typeof TransactionStore>;
export interface Transaction extends TransactionStoreInstance {}

type TransactionStoreSnapshotType = SnapshotOut<typeof TransactionStore>;
export interface TransactionStoreSnapshot extends TransactionStoreSnapshotType {}
