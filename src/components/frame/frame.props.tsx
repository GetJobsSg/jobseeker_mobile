import { Asset } from 'react-native-image-picker';

export interface FrameProps {
  onImagePick: (asset: Asset) => void;
  displayImage: string | undefined;
  placeholder?: string;
}
