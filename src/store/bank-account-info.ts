import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { BankStore } from './bank';
import * as apis from '../apis';

export const BankAccountInfoStore = types
  .model('BankAccountInfoStore')
  .props({
    id: types.optional(types.number, 0),
    walletID: types.optional(types.number, 0),
    accountNo: types.optional(types.string, ''),
    isPrimary: types.optional(types.boolean, false),
    bank: types.optional(BankStore, {}),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions((self) => ({
    getBankAccount: flow(function* getBankAccount(id: number) {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getBankAccount(id));

        if (!res?.data) return;

        const { data } = res;

        self.id = data.id;
        self.walletID = data.wallet_id;
        self.accountNo = data.account_no;
        self.isPrimary = data.is_primary;
        self.bank = data.bank;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    updateBankAccount: flow(function* updateBankAccount(id: number, data: any) {
      try {
        self.isLoading = true;

        yield apis.updateBankAccount(id, {
          bank_id: data.bankID,
          account_no: data.accountNo,
          is_primary: data.isPrimary,
        });

        yield self.getBankAccount(id);
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type BankAccountInfoStoreInstance = Instance<typeof BankAccountInfoStore>;
export interface BankAccountInfo extends BankAccountInfoStoreInstance {}

type BankAccountInfoStoreSnapshotType = SnapshotOut<typeof BankAccountInfoStore>;
export interface BankAccountInfoStoreSnapshot extends BankAccountInfoStoreSnapshotType {}
