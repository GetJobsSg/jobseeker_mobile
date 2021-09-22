import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import moment from 'moment';
import { View, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { useSuccess } from '../../../custom_hooks';
import {
  Screen,
  Text,
  Header,
  IconButton,
  RadioGroup,
  TextField,
  PhoneInput,
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
    mobile,
    birthDate,
    educationLevelID,
    vaccinated,
  };

  const handleFormSubmit = (data: PersonalInfoFormData) => {
    updateUser(data);
  };

  const returnEducationLevel = (educationLevelIDSelected: number) =>
    educationLevel?.find((el) => el.id === educationLevelIDSelected)?.name ?? 'Select an Education Level';

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

  return (
    <Screen>
      <Formik
        validationSchema={personalInfoValidation}
        validateOnChange
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ dirty, errors, touched, values, setFieldValue, handleChange, handleSubmit }) => (
          <View>
            <Header
              leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
              rightLabel={dirty ? <Text onPress={handleSubmit}>Save</Text> : null}
              title="Personal Information"
            />

            <TextField value={email} editable={false} label="Email" onChangeText={() => {}} />

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

            <TextField
              error={{
                shown: touched.mobile && errors.mobile,
                message: errors.mobile,
              }}
              value={values.mobile}
              label="Mobile No"
              onChangeText={handleChange('mobile')}
              keyboardType="number-pad"
              maxLength={8}
            />

            <PhoneInput label="Mobile No" value="90449045" onChangeText={() => {}} />

            <Selector
              label="Birth Date"
              value={values.birthDate ? moment(values.birthDate).format(DD_MMM_YYYY) : ''}
              onPress={() => birthRef.current.open()}
            />
            <Sheet type="datePicker" onOK={(data) => setFieldValue('birthDate', data.toISOString())} ref={birthRef} />

            {/* TODO: create picker component */}
            <Selector
              label="Education Level"
              value={
                values.educationLevelID !== 0
                  ? returnEducationLevel(values.educationLevelID)
                  : 'Select an Education Level'
              }
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
              label="Gender"
              alignment="horizontal"
              value={values.gender}
              onChange={(selected) => setFieldValue('gender', selected.value)}
              options={genderOptions}
            />

            <RadioGroup
              label="Have you fully vacinated?"
              alignment="vertical"
              value={values.vaccinated}
              onChange={(selected) => setFieldValue('vaccinated', selected.value)}
              options={yesNoOptions}
            />
          </View>
        )}
      </Formik>
    </Screen>
  );
};

export default observer(PersonalInfo);
