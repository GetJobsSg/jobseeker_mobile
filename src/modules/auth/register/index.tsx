import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../../store';
import { Button, Text, TextField } from '../../../components';
import { commonStyles } from '../../../common';
import { FormDataType, FieldType, RegisterProps } from './types';
import { usePrevious } from '../../../custom_hooks';

const initialFormData: FormDataType = {
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
};

const RegisterScreen = observer((props: RegisterProps) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [success, setSuccess] = useState(false);
  const {
    authStore: { register, error, isLoadingRegister },
  } = useMst();

  const previous = usePrevious({ isLoadingRegister, error });
  useEffect(() => {
    // do nothing if undefined
    if (!previous) return;

    // user successfully register
    if (previous.isLoadingRegister !== isLoadingRegister && !isLoadingRegister && !error) {
      setSuccess(true);
    }
  }, [previous, isLoadingRegister, error]);

  const handleRegister = () => {
    // TODO: validation
    const { cPassword, ...rest } = formData;
    register(rest);
  };

  const handleOnChange = (fieldName: FieldType) => (text: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: text,
    }));
  };

  const handlePostRegisterLogin = () => {
    const { route, navigation } = props;
    const prevScreen = route?.params?.prevScreen;

    // if user is navigate from login to register screen, goback to login screen
    if (prevScreen === 'authModal.login') {
      return navigation.goBack();
    }

    // replace with login screen
    return navigation.replace('authModal.login', { prevScreen: route.name });
  };

  return (
    <SafeAreaView style={commonStyles.FULL}>
      <View style={[commonStyles.FULL, commonStyles.CONTAINER]}>
        {!success && (
          <>
            <Text preset="header">Create Account</Text>
            <TextField
              label="Email"
              onChangeText={handleOnChange('email')}
              value={formData.email}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextField
              label="Password"
              onChangeText={handleOnChange('password')}
              value={formData.password}
              secureTextEntry
              returnKeyType="next"
            />
            <TextField
              label="Confirm Password"
              onChangeText={handleOnChange('cPassword')}
              value={formData.cPassword}
              secureTextEntry
              returnKeyType="next"
            />
            <TextField
              label="First Name"
              onChangeText={handleOnChange('firstName')}
              value={formData.firstName}
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextField
              label="Last Name"
              onChangeText={handleOnChange('lastName')}
              value={formData.lastName}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <Button block preset="primary" label="Create Account" onPress={handleRegister} style={{ marginTop: 10 }} />
          </>
        )}

        {success && (
          <>
            <Text>You have successfully register. Login now</Text>
            <Button block preset="primary" label="Login" onPress={handlePostRegisterLogin} style={{ marginTop: 10 }} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
});

export default RegisterScreen;
