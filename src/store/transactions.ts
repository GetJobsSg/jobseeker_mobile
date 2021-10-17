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
        dateCreated: data.date_created,
      };
    },
  }))
  .actions((self) => ({
    getAllTransactions: flow(function* getAllTransactions() {
      try {
        self.isLoading = true;
        self.transactions.clear();
        const res = yield* toGenerator(apis.getAllTransactions());
        if (!res?.data) return;

        const result = res.data.map((item: TransactionInfoResponse) => self.transformToState(item));
        self.transactions = result;
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
