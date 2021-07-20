import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Screen, Header, IconButton, Text } from '../../../components';
import { useMst } from '../../../store';

const TrainingScreen = () => {
  const navigation = useNavigation();
  const {
    userStore: { completeTraining },
  } = useMst();

  const handleComplete = () => {
    completeTraining();
  };

  return (
    <Screen preset="fixed">
      <Header
        title="Training"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        rightLabel={true ? <Text onPress={handleComplete}>Complete</Text> : null}
      />
    </Screen>
  );
};

export default observer(TrainingScreen);
