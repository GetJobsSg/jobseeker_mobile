import { Routes } from './routes';

export type RootParams = {
  [Routes.bottom_tabs_stack]: undefined;
  [Routes.auth_modal_stack]: undefined;
  [Routes.wallet_stack]: undefined;
  [Routes.profile_stack]: undefined;
  [Routes.settings_stack]: undefined;
  [Routes.job_stack]: undefined;
  [Routes.inbox_stack]: undefined;
  [Routes.company_stack]: undefined;
};

export type BottomTabParams = {
  [Routes.bottom_tabs_home]: undefined;
  [Routes.bottom_tabs_myjobs]: undefined;
  [Routes.bottom_tabs_inbox]: undefined;
  [Routes.bottom_tabs_account]: undefined;
};
