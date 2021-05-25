import * as yup from 'yup';
import { isAlphaCharacters } from '../../../common';

export const registerValidationSchema = yup.object({
  email: yup.string().required('Email is mandatory.').email('Email format is invalid.'),

  password: yup.string().required('Password is mandatory.').min(6, 'Please use at least 6 characters.'),

  cPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password'), null], 'Password is not match'),

  firstName: yup
    .string()
    .required('Please enter your first name.')
    .min(3, 'Minimum 3 characters.')
    .max(50, 'Maximum 50 characters.')
    .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val)),

  lastName: yup
    .string()
    .required('Please enter your last name.')
    .min(3, 'Minimum 3 characters.')
    .max(50, 'Maximum 50 characters.')
    .test('alphabets', 'Only alphabets letter is allowed.', (val) => isAlphaCharacters(val)),
});
