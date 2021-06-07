export interface HeaderProps {
  preset?: 'default';

  /** Icon name, you need to add your icon file into components/icon/icons.ts */
  leftIcon?: React.ReactElement;

  title?: string;

  /** Icon name, you need to add your icon file into components/icon/icons.ts */
  rightIcons?: React.ReactElement[];

  rightLabel?: React.ReactElement | null;
}
