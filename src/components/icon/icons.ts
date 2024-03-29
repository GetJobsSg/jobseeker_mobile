const icons = {
  // bottom nav
  home_active: require('../../assets/icons/bottom_navigator/home-active.png'),
  home_inactive: require('../../assets/icons/bottom_navigator/home-inactive.png'),

  myjobs_active: require('../../assets/icons/bottom_navigator/my-jobs-active.png'),
  myjobs_inactive: require('../../assets/icons/bottom_navigator/my-jobs-inactive.png'),

  inbox_active: require('../../assets/icons/bottom_navigator/inbox-active.png'),
  inbox_inactive: require('../../assets/icons/bottom_navigator/inbox-inactive.png'),

  account_active: require('../../assets/icons/bottom_navigator/account-active.png'),
  account_inactive: require('../../assets/icons/bottom_navigator/account-inactive.png'),

  // general
  circle_warning: require('../../assets/icons/general/circle-warning.png'),
  circle_done: require('../../assets/icons/general/circle-done.png'),
  camera: require('../../assets/icons/general/camera.png'),
  gallery: require('../../assets/icons/general/gallery.png'),
  select_image: require('../../assets/icons/general/select-image.png'),
  cross: require('../../assets/icons/general/cross.png'),
  location: require('../../assets/icons/general/location.png'),
  calendar: require('../../assets/icons/general/calendar.png'),
  clock: require('../../assets/icons/general/clock.png'),
  edit: require('../../assets/icons/general/edit.png'),

  // actions
  circle_back_btn: require('../../assets/icons/actions/circle-back-btn.png'),
  circle_cross_btn: require('../../assets/icons/actions/circle-cross-btn.png'),
  ic_arrow_right: require('../../assets/icons/actions/ic-arrow-right.png'),
  ic_arrow_right_primary: require('../../assets/icons/actions/ic-arrow-right-primary.png'),

  // accounts
  ic_settings: require('../../assets/icons/account/ic-settings.png'),
  ic_job_preferences: require('../../assets/icons/account/ic-job-preferences.png'),
  ic_shield_verified: require('../../assets/icons/account/ic-shield-verified.png'),
  ic_shield_unverified: require('../../assets/icons/account/ic-shield-unverified.png'),
  ic_wallet: require('../../assets/icons/account/ic-wallet.png'),

  // inbox
  inbox_message: require('../../assets/icons/inbox/mail.png'),
};

export type IconTypes = keyof typeof icons;
export type IconRenderer = () => IconTypes;

export default icons;
