import React, { useRef } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Icon, Text } from '..';
import { windowHeight } from '../../utils/screen';
import { CONTAINER, PLACEHOLDER_CONTAINER, PLACEHOLDER_HINT, EDIT } from './frame.styles';
import { FrameProps } from './frame.props';
import { IconTypes } from '../icon/icons';

const SHEET_CLOSE_DURATION = 200;
const DELAY = SHEET_CLOSE_DURATION + 200;

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

const Frame = (props: FrameProps) => {
  const { displayImage, placeholder = '', onImagePick } = props;
  const ref = useRef<any>();

  const handleLaunchCamera = () => {
    ref.current.close();
    setTimeout(() => {
      launchCamera(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        (res) => {
          if (res.didCancel) return;
          if (res.errorCode) return;
          if (!res.assets) return;
          const imageAsset = res.assets[0];
          onImagePick(imageAsset);
        },
      );
    }, DELAY); // wait animation for sheet to close
  };

  const handleLaunchLibrary = () => {
    ref.current.close();
    setTimeout(() => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
        },
        (res) => {
          if (res.didCancel) return;
          if (res.errorCode) return;
          if (!res.assets) return;
          const imageAsset = res.assets[0];
          onImagePick(imageAsset);
        },
      );
    }, DELAY); // wait animation for sheet to close
  };

  return (
    <>
      <TouchableOpacity style={CONTAINER} onPress={() => ref.current.open()}>
        <Image
          style={{ height: windowHeight * 0.3 }}
          source={{ uri: displayImage || undefined }}
          resizeMode="contain"
        />
        {displayImage === '' && (
          <View style={PLACEHOLDER_CONTAINER}>
            <Icon icon="select_image" />
            <Text style={PLACEHOLDER_HINT}>{placeholder}</Text>
          </View>
        )}
        {displayImage !== '' && (
          <View style={EDIT}>
            <Icon icon="edit" size={20} />
          </View>
        )}
      </TouchableOpacity>

      <RBSheet closeDuration={SHEET_CLOSE_DURATION} height={180} customStyles={{ container: { padding: 5 } }} ref={ref}>
        <SheetItem label="Camera" icon="camera" onPress={handleLaunchCamera} />
        <SheetItem label="Library" icon="gallery" onPress={handleLaunchLibrary} />
        <SheetItem label="Cancel" icon="cross" onPress={() => ref.current.close()} />
      </RBSheet>
    </>
  );
};

export default Frame;
