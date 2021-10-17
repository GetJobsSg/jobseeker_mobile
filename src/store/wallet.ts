import { flow, Instance, SnapshotOut, types } from 'mobx-state-tree';
import { withErrorHandler, withRootStore } from './extensions';
import { WalletResponse } from '../modules/wallet/types';
import * as apis from '../apis';

export const WalletStore = types
  .model('WalletStore')
  .props({
    amountDollar: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    isLoadingWithdraw: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
    errorWithdraw: types.optional(types.string, ''),
  })
  .views((self) => ({
    get formattedAmountDollar() {
      const formattedDollar = self.amountDollar.toFixed(2);
      return `S$ ${formattedDollar}`;
    },
  }))
  .extend(withErrorHandler)
  .extend(withRootStore)
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
  }))
  .actions((self) => ({
    withdraw: flow(function* withdraw(id: number) {
      try {
        self.isLoadingWithdraw = true;
        self.errorWithdraw = '';
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.withdrawWallet(id);
        yield apis.getWallet();
        self.getWallet();
        self.rootStore.transactionStore.getAllTransactions();
      } catch (e) {
        self.errorWithdraw = self.getErrMsg(e);
      } finally {
        self.isLoadingWithdraw = false;
        self.rootStore.uiStore.hideLoadingSpinner();
      }
    }),
  }));

type WalletStoreInstance = Instance<typeof WalletStore>;
export interface Wallet extends WalletStoreInstance {}

type WalletStoreSnapshotType = SnapshotOut<typeof WalletStore>;
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
