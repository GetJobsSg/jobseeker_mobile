import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Asset } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Screen, Header, IconButton, Text, Frame } from '../../../components';
import { useMst } from '../../../store';

const PersonalPhotoScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<Asset>();
  const {
    userStore: { profileImg, uploadPersonalPhoto },
  } = useMst();

  const handleUpload = () => {
    if (!photo) return;
    uploadPersonalPhoto({ profileImage: photo });
  };

  return (
    <Screen preset="fixed">
      <Header
        title="Profile Photo"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        rightLabel={photo ? <Text onPress={handleUpload}>Upload</Text> : null}
      />
      <Frame
        placeholder="Upload your personal photo"
        displayImage={photo?.uri || profileImg}
        onImagePick={(imageAsset) => setPhoto(imageAsset)}
      />
    </Screen>
  );
};

export default observer(PersonalPhotoScreen);
