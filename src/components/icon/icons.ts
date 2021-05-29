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

  // arrow
  circle_back_btn: require('../../assets/icons/arrow/circle-back-btn.png'),

  // actions
  circle_cross_btn: require('../../assets/icons/actions/circle-cross-btn.png'),
};

export type IconTypes = keyof typeof icons;
export type IconRenderer = () => IconTypes;

export default icons;
