import { IconTypes } from '../icon/icons';

export interface ListTileProps {
  leadingIcon?: IconTypes;
  title: string | React.ReactElement;
  description?: string;
  onPress: () => void;
  traillingIcons?: IconTypes[];
}
