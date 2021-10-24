import React, { useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text,
  Header,
  IconButton,
  RadioGroup,
  TextField,
  Selector,
  Sheet,
  Touchable,
  Button,
} from '../../../components';
import { BankAccountFormData, WalletBankAccountAddEditProps } from '../types';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { bankAccountValidation } from './validation';
import { commonStyles } from '../../../common';

import { Bank } from '../../../store/bank';

const AddEditBankAccountScreen = () => {
  const navigation = useNavigation<any>();
  const {
    params: { id },
  } = useRoute<WalletBankAccountAddEditProps>();

  const bankRef = useRef<any>();

  const {
    authStore: { isAuthenticated },
    bankAccountStore: { getBanks, addBankAccount, deleteBankAccount, banks },
    bankAccountInfoStore: { getBankAccount, updateBankAccount, accountNo, bank, isPrimary },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getBanks();

      if (id > 0) {
        getBankAccount(id);
      }
    }
  }, [isAuthenticated, id, getBanks, getBankAccount]);

  const initialValues: BankAccountFormData = {
    accountNo: id > 0 ? accountNo : '',
    bankID: id > 0 ? bank.id : 0,
    isPrimary: id > 0 ? Number(isPrimary) : 0,
  };

  const handleFormSubmit = (data: BankAccountFormData) => {
    if (id === 0) {
      addBankAccount(data);
    } else {
      updateBankAccount(id, data);
    }
    navigation.pop();
  };

  const returnBankName = (bankID: number) => banks?.find((el) => el.id === bankID)?.name ?? 'Select a Bank';

  const onSelectDelete = () => {
    deleteBankAccount(id);
    navigation.pop(2);
  };

  const renderBankItem = (item: Bank, setFieldValue: any) => (
    <View style={{ paddingVertical: spacing.sm }}>
      <Touchable
        onPress={() => {
          setFieldValue('bankID', item.id);
          bankRef.current.close();
        }}
      >
        <View>
          <Text>{item.name}</Text>
          <Text preset="hint">{item.code}</Text>
        </View>
      </Touchable>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={[{ flex: 1 }]}>
        <Formik
          validationSchema={bankAccountValidation}
          validateOnChange
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        >
          {({ dirty, errors, touched, values, setFieldValue, handleChange, handleSubmit }) => (
            <View>
              <Header
                title="Bank Account"
                leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
                rightLabel={dirty || id > 0 ? <Text onPress={handleSubmit}>Save</Text> : null}
              />

              <View style={[commonStyles.SAFE_PADDING, { marginTop: spacing.md }]}>
                <TextField
                  value={values.accountNo}
                  error={{
                    shown: touched.accountNo && errors.accountNo,
                    message: errors.accountNo,
                  }}
                  label="Account No."
                  keyboardType="numeric"
                  onChangeText={handleChange('accountNo')}
                />

                <Selector
                  label="Bank"
                  value={values.bankID !== 0 ? returnBankName(values.bankID) : 'Select a Bank'}
                  error={{
                    shown: touched.bankID && errors.bankID,
                    message: errors.bankID,
                  }}
                  onPress={() => bankRef.current.open()}
                />
                <Sheet ref={bankRef}>
                  <FlatList data={banks} renderItem={({ item }) => renderBankItem(item as Bank, setFieldValue)} />
                </Sheet>

                {id > 0 && (
                  <RadioGroup
                    label="Set as primary account?"
                    value={values.isPrimary}
                    onChange={(selected) => setFieldValue('isPrimary', selected.value)}
                    error={{
                      shown: touched.isPrimary && errors.isPrimary,
                      message: errors.isPrimary,
                    }}
                    options={[
                      { label: 'Yes', value: 1 },
                      { label: 'No', value: 0 },
                    ]}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>

      {id > 0 && (
        <View style={commonStyles.STICKY_BOTTOM}>
          <Button
            block
            label="Delete Account"
            style={{ backgroundColor: colors.danger, borderColor: colors.danger }}
            onPress={() => onSelectDelete()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default observer(AddEditBankAccountScreen);
