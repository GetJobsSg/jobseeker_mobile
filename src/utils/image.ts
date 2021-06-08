import { ImagePickerResponse, Asset } from 'react-native-image-picker';

export const getExtension = (fileType: string) => fileType.split('/')[1];

export const converToBase64Image = (data: ImagePickerResponse) => {
  const imageData = data.assets[0];
  return `data:${imageData.type};base64,${imageData.base64}`;
};

export const constructUploadImagePayload = (asset: Asset) => ({
  ext: getExtension(asset.type as string),
  base64: asset.base64 as string,
});
