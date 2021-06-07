import { ImagePickerResponse } from 'react-native-image-picker';

export const getExtension = (fileType: string) => fileType.split('/')[1];

export const converToBase64Image = (data: ImagePickerResponse) => {
  const imageData = data.assets[0];
  return {
    ext: getExtension(imageData.type as string),
    imgString: `data:${imageData.type};base64,${imageData.base64}`,
  };
};
