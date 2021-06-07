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
  .min(3, 'Minimum 3 characters.')
  .max(50, 'Maximum 50 characters.')
  .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val));

export const lastNameValidator = yup
  .string()
  .required('Please enter your last name.')
  .min(3, 'Minimum 3 characters.')
  .max(50, 'Maximum 50 characters.')
  .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val));

export const mobileValidator = yup
  .string()
  .required('Please enter your mobile number')
  .length(8, 'Invalid mobile number');

export const genderValidator = yup.string().nullable().required('Please select your gender');
