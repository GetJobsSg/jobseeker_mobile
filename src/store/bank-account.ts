import { flow, Instance, SnapshotOut, toGenerator, types } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { BankAccountResponse, BankResponse } from '../modules/wallet/types';
import { BankStore } from './bank';
import { BankAccountInfoStore } from './bank-account-info';
import * as apis from '../apis';

export const BankAccountStore = types
  .model('WalletStore')
  .props({
    bankAccounts: types.optional(types.array(BankAccountInfoStore), []),
    banks: types.optional(types.array(BankStore), []),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions((self) => ({
    getBankAccounts: flow(function* getBankAccounts() {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getBankAccounts());
        self.bankAccounts.clear();

        res.data.forEach((item: BankAccountResponse) => {
          self.bankAccounts.push({
            id: item.id,
            walletID: item.wallet_id,
            accountNo: item.account_no,
            isPrimary: item.is_primary,
            bank: item.bank,
          });
        });
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    getBanks: flow(function* getBanks() {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getBanks());
        self.banks.clear();

        res.data.forEach((item: BankResponse) => {
          self.banks.push({
            id: item.id,
            name: item.name,
            code: item.code,
            bic: item.bic,
          });
        });
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),

    addBankAccount: flow(function* addBankAccount(data: any) {
      try {
        self.isLoading = true;

        const transformed = { bank_id: data.bankID, account_no: data.accountNo };

        yield* toGenerator(apis.addBankAccount(transformed));

        yield self.getBankAccounts();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),

    deleteBankAccount: flow(function* deleteBankAccount(id: number) {
      try {
        self.isLoading = true;

        yield* toGenerator(apis.deleteBankAccount(id));

        yield self.getBankAccounts();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type BankAccountStoreInstance = Instance<typeof BankAccountStore>;
export interface BankAccount extends BankAccountStoreInstance {}

type BankAccountStoreSnapshotType = SnapshotOut<typeof BankAccountStore>;
export interface BankAccountStoreSnapshot extends BankAccountStoreSnapshotType {}
