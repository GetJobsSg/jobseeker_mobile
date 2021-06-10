import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { WalletResponse } from '../modules/wallet/types';
import * as apis from '../apis';

export const JobStore = types
  .model('JobStore')
  .props({
    amountDollar: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .views((self) => ({
    get formattedAmountDollar() {
      const formattedDollar = self.amountDollar.toFixed(2);
      return `S$ ${formattedDollar}`;
    },
  }))
  .extend(withErrorHandler)
  .actions((self) => ({
    getWallet: flow(function* getWallet() {
      try {
        self.isLoading = true;
        const resp = yield apis.getWallet();
        const data = resp.data as WalletResponse;
        self.amountDollar = data.balance;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type JobStoreInstance = Instance<typeof JobStore>;
export interface Job extends JobStoreInstance {}

type JobStoreSnapshotType = SnapshotOut<typeof JobStore>;
export interface JobStoreSnapshot extends JobStoreSnapshotType {}
