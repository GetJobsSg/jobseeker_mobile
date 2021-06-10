import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { WalletResponse } from '../modules/wallet/types';
import * as apis from '../apis';

export const WalletStore = types
  .model('WalletStore')
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

type WalletStoreInstance = Instance<typeof WalletStore>;
export interface Wallet extends WalletStoreInstance {}

type WalletStoreSnapshotType = SnapshotOut<typeof WalletStore>;
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
