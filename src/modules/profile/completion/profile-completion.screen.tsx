import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { IconTypes } from 'src/components/icon/icons';
import { Screen, Header, ListTile, IconButton } from '../../../components';
import { useMst } from '../../../store';
import { Routes } from '../../../navigator/routes';

const ProfileCompletion = () => {
  const navigation = useNavigation();
  const {
    userStore: { isPersonalInfoCompleted, isPersonalPhotoUploaded, isNRICInfoCompleted, isTrainingCompleted },
  } = useMst();

  const { params } = useRoute();
  console.log({ params });

  const renderTraillingIcons = (infoCompleted: boolean): IconTypes[] => {
    if (infoCompleted) return ['circle_done', 'ic_arrow_right'];
    return ['circle_warning', 'ic_arrow_right'];
  };

  return (
    <Screen preset="scroll" unsafeArea={['top', 'bottom']}>
      <Header title="Profile" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
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
    </Screen>
  );
};

export default observer(ProfileCompletion);
