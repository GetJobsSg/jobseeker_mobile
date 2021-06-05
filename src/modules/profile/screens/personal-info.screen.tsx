import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Screen, Text, Header, IconButton, RadioGroup, TextField, Selector, Sheet } from '../../../components';
import { genderOptions } from '../../../constants/options';
import { useMst } from '../../../store';

const validation = yup.object({
  mobile: yup.string().required(),
});

const PersonalInfo = () => {
  const navigation = useNavigation();
  const birthRef = useRef<any>();

  const {
    userStore: { lastName, gender, firstName, mobile, birthDate },
  } = useMst();

  const initialValues = {
    firstName,
    lastName,
    gender,
    mobile,
    birthDate,
  };

  const handleFormSubmit = () => {};

  return (
    <Screen>
      <Formik
        validationSchema={validation}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue, handleChange, handleSubmit }) => (
          <View>
            <Header
              leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
              rightLabel={<Text onPress={handleSubmit}>Save</Text>}
            />
            <TextField value={values.firstName} label="First Name" onChangeText={handleChange('firstName')} />
            <TextField value={values.lastName} label="Last Name" onChangeText={handleChange('lastName')} />
            <TextField
              value={values.mobile}
              label="Mobile No"
              onChangeText={handleChange('mobile')}
              keyboardType="number-pad"
            />

            <Selector label="Birth Date" value={values.birthDate} onPress={() => birthRef.current.open()} />

            <RadioGroup
              label="Gender"
              value={values.gender}
              onChange={(selected) => setFieldValue('gender', selected.value, false)}
              options={genderOptions}
            />

            <Sheet
              type="datePicker"
              onOK={(data) => setFieldValue('birthDate', data.toISOString(), false)}
              ref={birthRef}
            />
          </View>
        )}
      </Formik>
    </Screen>
  );
};

export default observer(PersonalInfo);
