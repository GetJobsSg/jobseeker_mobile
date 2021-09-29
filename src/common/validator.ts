import * as yup from 'yup';

export const isAlphaCharacters = (value: string | undefined) => {
  if (!value) return false;
  return /^[a-zA-Z\s]+$/.test(value);
};

export const emailValidator = yup.string().required('Email is mandatory.').email('Email format is invalid.');

export const passwordValidator = yup
  .string()
  .required('Password is mandatory.')
  .min(6, 'Please use at least 6 characters.');

export const cPasswordValidator = yup
  .string()
  .required('Please confirm your password.')
  .oneOf([yup.ref('password'), null], 'Password is not match');

export const firstNameValidator = yup
  .string()
  .required('Please enter your first name.')
  .min(2, 'Minimum 2 characters.')
  .max(50, 'Maximum 50 characters.')
  .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val));

export const lastNameValidator = yup
  .string()
  .required('Please enter your last name.')
  .min(2, 'Minimum 2 characters.')
  .max(50, 'Maximum 50 characters.')
  .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val));

export const mobileValidator = yup
  .string()
  .required('Please enter your mobile number')
  .length(8, 'Invalid mobile number');

export const accountNoValidator = yup
  .string()
  .required('Please enter your account number')
  .min(5, 'Invalid account number')
  .max(30, 'Invalid account number');

export const bankValidator = yup.number().moreThan(0, 'Please select a bank').required('Please select a bank');

export const birthValidator = yup.string().required('Please select your birth date');

export const educationValidator = yup.number().nullable().required('Please select your education');

export const genderValidator = yup.string().nullable().required('Please select your gender');

export const vacinatedValidator = yup.number().nullable().required('Please select your vacinated status');

export const optionValidator = yup.number().moreThan(-1, 'Please select an option').required('Please select an option');

export const nricValidator = yup
  .string()
  .required('NRIC/FIN is mandatory field')
  .length(9, 'NRIC/FIN comprising 9 alphanumeric characters');
