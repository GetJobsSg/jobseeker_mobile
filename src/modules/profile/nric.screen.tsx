import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Screen, Header, IconButton, Sheet, Text, Button } from '../../components';

const NricScreen = () => {
  const navigation = useNavigation();
  const selectRef = useRef() as any;

  return (
    <Screen preset="scroll" unsafeArea={['top', 'bottom']}>
      <Header title="NRIC / FIN" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />

      <Button
        label="Select Option"
        onPress={() => {
          selectRef.current.open();
        }}
      />
      <Sheet ref={selectRef}>
        <Text>1</Text>
      </Sheet>
    </Screen>
  );
};

export default NricScreen;
