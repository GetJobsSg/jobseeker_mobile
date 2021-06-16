import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Asset } from 'react-native-image-picker';

import { Screen, Frame, Header, IconButton, Text } from '../../../components';
import { useSuccess } from '../../../custom_hooks';
import { useMst } from '../../../store';
import { NricFormData } from '../types';

const NricScreen = () => {
  const navigation = useNavigation();
  const {
    userStore: { nricFront, nricBack, uploadNric, isUpdating, error },
  } = useMst();

  const [selectedNricFrontImage, setSelectedNricFrontImage] = useState<Asset>();
  const [selectedNricBackImage, setSelectedNricBackImage] = useState<Asset>();

  // upload successful
  const isUploadSuccess = useSuccess({ loadingState: isUpdating, errorState: error });
  if (isUploadSuccess) setTimeout(() => navigation.goBack(), 0);

  const handleImageTarget = (target: 'nricFront' | 'nricBack', imageAsset: Asset) => {
    if (target === 'nricFront') {
      setSelectedNricFrontImage(imageAsset);
    } else {
      setSelectedNricBackImage(imageAsset);
    }
  };

  const handleUpload = () => {
    // no image is selected
    if (!selectedNricFrontImage?.uri && !selectedNricBackImage?.uri) return;

    const nricData: NricFormData = {};
    if (selectedNricFrontImage) nricData.nricFront = selectedNricFrontImage;
    if (selectedNricBackImage) nricData.nricBack = selectedNricBackImage;

    uploadNric(nricData);
  };

  const isImageSelected = () => !!selectedNricFrontImage || !!selectedNricBackImage;

  return (
    <Screen preset="scroll" unsafeArea={['top', 'bottom']}>
      <Header
        title="NRIC / FIN"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        rightLabel={isImageSelected() ? <Text onPress={handleUpload}>Upload</Text> : null}
      />

      <Frame
        placeholder="Upload your NRIC / FIN Front Page"
        displayImage={selectedNricFrontImage?.uri || nricFront}
        onImagePick={(imageAsset) => handleImageTarget('nricFront', imageAsset)}
      />

      <Frame
        placeholder="Upload your NRIC / FIN Back Page"
        displayImage={selectedNricBackImage?.uri || nricBack}
        onImagePick={(imageAsset) => handleImageTarget('nricBack', imageAsset)}
      />
    </Screen>
  );
};

export default observer(NricScreen);
