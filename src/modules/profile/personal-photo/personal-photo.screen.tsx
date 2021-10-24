import React, { useState } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Asset } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FixedScreen, Header, IconButton, Text, Frame } from '../../../components';
import { useMst } from '../../../store';
import { useSuccess } from '../../../custom_hooks';

const PersonalPhotoScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<Asset>();
  const {
    userStore: { profileImg, uploadPersonalPhoto, isUpdating, error },
  } = useMst();

  const handleUpload = () => {
    if (!photo) return;
    uploadPersonalPhoto({ profileImage: photo });
  };

  const successUpload = useSuccess({ loadingState: isUpdating, errorState: error });
  if (successUpload) {
    // trick to remove warning
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  }

  return (
    <FixedScreen
      appBar={
        <Header
          title="Profile Photo"
          leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
          rightLabel={photo ? <Text onPress={handleUpload}>Upload</Text> : null}
        />
      }
    >
      <View style={{ marginTop: 10 }}>
        <Frame
          placeholder="Upload your personal photo"
          displayImage={photo?.uri || profileImg}
          onImagePick={(imageAsset) => setPhoto(imageAsset)}
        />
      </View>
    </FixedScreen>
  );
};

export default observer(PersonalPhotoScreen);
