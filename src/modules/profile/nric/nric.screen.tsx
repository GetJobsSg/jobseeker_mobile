import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

import { ScrollingScreen, Frame, Header, IconButton, Text, TextField } from '../../../components';
import { useSuccess } from '../../../custom_hooks';
import { useMst } from '../../../store';
import { NricFormData } from '../types';
import { nricValidator } from '../../../common';
import { spacing } from '../../../themes';

const nricValidationSchema = yup.object({
  nricNo: nricValidator,
  nricFront: yup.object().notRequired(),
  nricBack: yup.object().notRequired(),
});

const NricScreen = () => {
  const navigation = useNavigation();
  const {
    userStore: { nric, nricFront, nricBack, updateNricInfo, isUpdating, error },
  } = useMst();

  // formik form
  const { dirty, values, errors, isValid, setFieldValue, handleSubmit } = useFormik({
    initialValues: { nricNo: nric || '' },
    validationSchema: nricValidationSchema,
    onSubmit: (_data: NricFormData) => {
      updateNricInfo(_data);
    },
  });

  // upload successful
  const isUploadSuccess = useSuccess({ loadingState: isUpdating, errorState: error });
  if (isUploadSuccess) setTimeout(() => navigation.goBack(), 0);

  return (
    <ScrollingScreen
      appBar={
        <Header
          title="NRIC / FIN"
          leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
          rightLabel={dirty && isValid ? <Text onPress={handleSubmit}>Save</Text> : null}
        />
      }
    >
      <TextField
        error={{
          shown: !!errors.nricNo,
          message: errors.nricNo,
        }}
        style={{ marginBottom: spacing.sm }}
        value={values.nricNo || ''}
        label="NRIC / FIN No"
        maxLength={9}
        onChangeText={(text) => setFieldValue('nricNo', text.toUpperCase())}
      />

      <Frame
        placeholder="Upload your NRIC / FIN Front Page"
        displayImage={values.nricFront?.uri || nricFront}
        onImagePick={(imageAsset) => {
          setFieldValue('nricFront', imageAsset);
        }}
      />

      <Frame
        placeholder="Upload your NRIC / FIN Back Page"
        displayImage={values.nricBack?.uri || nricBack}
        onImagePick={(imageAsset) => {
          setFieldValue('nricBack', imageAsset);
        }}
      />
    </ScrollingScreen>
  );
};

export default observer(NricScreen);
