import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { IconTypes } from 'src/components/icon/icons';
import { ScrollingScreen, Header, ListTile, IconButton } from '../../../components';
import { useMst } from '../../../store';
import { Routes } from '../../../navigator/routes';

const ProfileCompletion = () => {
  const navigation = useNavigation();
  const {
    userStore: { isPersonalInfoCompleted, isPersonalPhotoUploaded, isNRICInfoCompleted, isTrainingCompleted },
  } = useMst();

  const renderTraillingIcons = (infoCompleted: boolean): IconTypes[] => {
    if (infoCompleted) return ['circle_done', 'ic_arrow_right'];
    return ['circle_warning', 'ic_arrow_right'];
  };

  return (
    <ScrollingScreen
      appBar={
        <Header title="Profile" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      }
    >
      <ListTile
        title="Personal Photo"
        onPress={() => navigation.navigate(Routes.personal_photo)}
        traillingIcons={renderTraillingIcons(isPersonalPhotoUploaded)}
      />
      <ListTile
        title="Personal Information"
        onPress={() => navigation.navigate(Routes.personal_info)}
        traillingIcons={renderTraillingIcons(isPersonalInfoCompleted)}
      />
      <ListTile
        title="NRIC / FIN"
        onPress={() => navigation.navigate(Routes.nric_info)}
        traillingIcons={renderTraillingIcons(isNRICInfoCompleted)}
      />
      <ListTile
        title="Training Questionnaire"
        onPress={() => navigation.navigate(Routes.training)}
        traillingIcons={renderTraillingIcons(isTrainingCompleted)}
      />
    </ScrollingScreen>
  );
};

export default observer(ProfileCompletion);
