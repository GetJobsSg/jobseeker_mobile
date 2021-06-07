import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { usePrevious } from '../../custom_hooks';
import { Screen, Text, Header, IconButton, RadioGroup, TextField, Selector, Sheet } from '../../components';
import { genderOptions } from '../../constants/options';
import { useMst } from '../../store';
import { PersonalInfoState } from './types';
import { DD_MMM_YYYY } from '../../constants/dateTime';
import { personalInfoValidation } from './validation';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const birthRef = useRef<any>();
  const {
    userStore: { updateUser, isUpdating, lastName, gender, firstName, mobile, birthDate },
  } = useMst();

  const previous = usePrevious({ isUpdating });
  useEffect(() => {
    if (!previous) return;

    // successfully update info
    if (previous.isUpdating !== isUpdating && !isUpdating) {
      navigation.goBack();
    }
  }, [previous, navigation, isUpdating]);

  const initialValues: PersonalInfoState = {
    firstName,
    lastName,
    gender,
    mobile,
    birthDate,
  };

  const handleFormSubmit = (data: PersonalInfoState) => {
    updateUser(data);
  };

  return (
    <Screen>
      <Formik
        validationSchema={personalInfoValidation}
        validateOnChange
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ dirty, errors, touched, values, setFieldValue, handleChange, handleSubmit }) => {
          console.log('errors>>>>>', errors);
          return (
            <View>
              <Header
                leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
                rightLabel={dirty ? <Text onPress={handleSubmit}>Save</Text> : null}
                title="Personal Information"
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

              <Selector
                label="Birth Date"
                value={moment(values.birthDate).format(DD_MMM_YYYY)}
                onPress={() => birthRef.current.open()}
              />
              <Sheet type="datePicker" onOK={(data) => setFieldValue('birthDate', data.toISOString())} ref={birthRef} />

              <RadioGroup
                label="Gender"
                value={values.gender}
                onChange={(selected) => setFieldValue('gender', selected.value)}
                options={genderOptions}
              />
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
};

export default observer(PersonalInfo);
