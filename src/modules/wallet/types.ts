import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';

type WalletParamsList = {
  [Routes.wallet_overview]: undefined;
  [Routes.wallet_allTransaction]: undefined;
  [Routes.wallet_transactionDetails]: { id: number };
  [Routes.wallet_bank_accountDetails]: { id: number };
  [Routes.wallet_add_edit_bank_account]: { id: number };
};

export type WalletNavigationProp = StackNavigationProp<WalletParamsList, Routes.wallet_overview>;
export type WalletRouteProps = RouteProp<WalletParamsList, Routes.wallet_overview>;
export type WalletTransactionDetailsProps = RouteProp<WalletParamsList, Routes.wallet_transactionDetails>;
export type WalletBankAccountDetailProps = RouteProp<WalletParamsList, Routes.wallet_bank_accountDetails>;
export type WalletBankAccountAddEditProps = RouteProp<WalletParamsList, Routes.wallet_add_edit_bank_account>;

export type WalletScreenProps = {
  navigation: WalletNavigationProp;
  route: WalletRouteProps;
};

export interface BankAccountFormData {
  accountNo: string;
  bankID: number;
  isPrimary: number;
}

export type WalletResponse = {
  id: number;
  balance: number;
  date_updated: string;
  date_created: string;
};

export type BankResponse = {
  id: number;
  name: string;
  code: string;
  bic: string;
  date_updated: string;
  date_created: string;
};

export type BankAccountResponse = {
  id: number;
  wallet_id: number;
  account_no: string;
  is_primary: boolean;
  date_updated: string;
  date_created: string;
  bank: BankResponse;
};
