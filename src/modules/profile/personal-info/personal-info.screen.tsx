import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import { Routes } from '../../../navigator/routes';
import { useSuccess } from '../../../custom_hooks';
import {
  Screen,
  Text,
  Header,
  IconButton,
  RadioGroup,
  TextField,
  Selector,
  Sheet,
  Touchable,
} from '../../../components';
import { genderOptions, yesNoOptions } from '../../../constants/options';
import { useMst } from '../../../store';
import { spacing } from '../../../themes';
import { PersonalInfoFormData } from '../types';
import { DD_MMM_YYYY } from '../../../constants/dateTime';
import { personalInfoValidation } from './validation';

import { Education } from '../../../store/education';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const birthRef = useRef<any>();
  const {
    userStore: {
      error,
      email,
      updateUser,
      isUpdating,
      lastName,
      gender,
      firstName,
      mobile,
      birthDate,
      educationLevelID,
      vaccinated,
      emailVerified,
      mobileVerified,
    },
    educationLevelStore: { educationLevel },
  } = useMst();

  // successfully update info
  const isSuccessUpdateInfo = useSuccess({ loadingState: isUpdating, errorState: error });
  if (isSuccessUpdateInfo) setTimeout(() => navigation.goBack(), 0);

  const educationLevelRef = useRef<any>();

  const initialValues: PersonalInfoFormData = {
    firstName,
    lastName,
    gender,
    birthDate,
    educationLevelID,
    vaccinated,
  };

  const renderEducationLevelItem = (item: Education, setFieldValue: any) => (
    <View style={{ paddingVertical: spacing.sm }}>
      <Touchable
        onPress={() => {
          setFieldValue('educationLevelID', item.id);
          educationLevelRef.current.close();
        }}
      >
        <View>
          <Text>{item.name}</Text>
        </View>
      </Touchable>
    </View>
  );

  const { dirty, errors, touched, values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: personalInfoValidation,
    onSubmit: (data: PersonalInfoFormData) => updateUser(data),
  });

  const getEducationLevelVal = () => {
    if (values.educationLevelID == null) return '';
    const edu = educationLevel.find((el) => String(el.id) === String(values.educationLevelID));
    return edu ? edu.name : '';
  };

  return (
    <Screen>
      <View style={{ paddingBottom: 100 }}>
        <Header
          leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
          rightLabel={dirty ? <Text onPress={handleSubmit}>Save</Text> : null}
          title="Personal Information"
        />

        <Selector
          actionLabel={!emailVerified ? 'Verify' : 'Edit'}
          label="Email"
          onPress={() => navigation.navigate(Routes.otpVerify, { mobile })}
          value={email}
        />

        <Selector
          actionLabel={mobile && !mobileVerified ? 'Verify' : 'Edit'}
          label="Mobile"
          onPress={() => navigation.navigate(Routes.editMobile, { mobile })}
          value={mobile}
        />

        <TextField
          value={values.firstName}
          error={{
            shown: touched.firstName && errors.firstName,
            message: errors.firstName,
          }}
          label="First Name"
          onChangeText={handleChange('firstName')}
        />

        <TextField
          error={{
            shown: touched.lastName && errors.lastName,
            message: errors.lastName,
          }}
          value={values.lastName}
          label="Last Name"
          onChangeText={handleChange('lastName')}
        />

        <Selector
          label="Birth Date"
          value={values.birthDate ? moment(values.birthDate).format(DD_MMM_YYYY) : ''}
          placeholder="Select your birth date"
          error={{
            shown: touched.birthDate && errors.birthDate,
            message: errors.birthDate,
          }}
          onPress={() => birthRef.current.open()}
        />
        <Sheet type="datePicker" onOK={(data) => setFieldValue('birthDate', data.toISOString())} ref={birthRef} />

        {/* TODO: create picker component */}
        <Selector
          label="Education Level"
          value={getEducationLevelVal()}
          placeholder="Select an education level"
          error={{
            shown: touched.educationLevelID && errors.educationLevelID,
            message: errors.educationLevelID,
          }}
          onPress={() => educationLevelRef.current.open()}
        />
        <Sheet ref={educationLevelRef}>
          <FlatList
            data={educationLevel}
            renderItem={({ item }) => renderEducationLevelItem(item as Education, setFieldValue)}
          />
        </Sheet>

        <RadioGroup
          error={{
            message: errors.gender,
            shown: touched.gender && errors.gender,
          }}
          label="Gender"
          alignment="horizontal"
          value={values.gender}
          onChange={(selected) => setFieldValue('gender', selected.value)}
          options={genderOptions}
        />

        <RadioGroup
          error={{
            message: errors.vaccinated,
            shown: touched.vaccinated && errors.vaccinated,
          }}
          label="Have you fully vacinated?"
          alignment="vertical"
          value={values.vaccinated}
          onChange={(selected) => setFieldValue('vaccinated', selected.value)}
          options={yesNoOptions}
        />
      </View>
    </Screen>
  );
};

export default observer(PersonalInfo);
