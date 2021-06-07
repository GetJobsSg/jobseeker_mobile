import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import { IconTypes } from 'src/components/icon/icons';
import { Screen, Header, IconButton, Text, Icon } from '../../../components';
import { useMst } from '../../../store';
import { NricFormData } from '../types';
import Frame from './frame';

interface SheetItemProps {
  icon: IconTypes;
  label: string;
  onPress: () => void;
}

const SheetItem = ({ icon, label, onPress }: SheetItemProps) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
    <Icon size={30} icon={icon} />
    <Text style={{ marginLeft: 10, letterSpacing: 1.2 }}>{label}</Text>
  </TouchableOpacity>
);

const sheetCloseDuration = 200;
const cameraLibraryOpenDelay = sheetCloseDuration + 200;

const NricScreen = () => {
  const navigation = useNavigation();
  const selectRef = useRef() as any;
  const {
    userStore: { nricFront, nricBack, uploadNric },
  } = useMst();

  const [target, setTarget] = useState<'nricFront' | 'nricBack'>('nricFront');
  const [selectedNricFrontImage, setSelectedNricFrontImage] = useState<Asset>();
  const [selectedNricBackImage, setSelectedNricBackImage] = useState<Asset>();

  const handleImageTarget = (imageAsset: Asset) => {
    if (target === 'nricFront') return setSelectedNricFrontImage(imageAsset);
    return setSelectedNricBackImage(imageAsset);
  };

  const handleLaunchCamera = () => {
    selectRef.current.close();
    // wait until bottom sheet is completely close, open camera
    setTimeout(() => {
      launchCamera(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        (res) => {
          if (res.didCancel) return;
          if (res.errorCode) return;
          const imageAsset = res.assets[0];
          handleImageTarget(imageAsset);
        },
      );
    }, cameraLibraryOpenDelay);
  };

  const handleLaunchLibrary = () => {
    selectRef.current.close();
    // wait until bottom sheet is completely close, open library
    setTimeout(() => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        (res) => {
          if (res.didCancel) return;
          if (res.errorCode) return;
          const imageAsset = res.assets[0];
          handleImageTarget(imageAsset);
        },
      );
    }, cameraLibraryOpenDelay);
  };

  const handleUpload = () => {
    // no image is selected
    if (!selectedNricFrontImage?.uri && !selectedNricFrontImage?.uri) return;

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
        onPress={() => {
          setTarget('nricFront');
          selectRef.current.open();
        }}
      />

      <Frame
        placeholder="Upload your NRIC / FIN Back Page"
        displayImage={selectedNricBackImage?.uri || nricBack}
        onPress={() => {
          setTarget('nricBack');
          selectRef.current.open();
        }}
      />

      <RBSheet
        closeDuration={sheetCloseDuration}
        height={200}
        customStyles={{ container: { padding: 5 } }}
        ref={selectRef}
      >
        <SheetItem label="Camera" icon="camera" onPress={handleLaunchCamera} />
        <SheetItem label="Library" icon="gallery" onPress={handleLaunchLibrary} />
        <SheetItem label="Cancel" icon="cross" onPress={() => selectRef.current.close()} />
      </RBSheet>
    </Screen>
  );
};

export default observer(NricScreen);
