export interface HeaderProps {
  preset?: 'default';

  /** Icon name, you need to add your icon file into components/icon/icons.ts */
  leftIcon?: React.ReactElement;

  /** Icon name, you need to add your icon file into components/icon/icons.ts */
  rightIcons?: React.ReactElement[];

  rightLabel?: React.ReactElement;
}
