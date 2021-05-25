import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  email: yup.string().required('Email is mandatory.').email('Email format is invalid.'),

  password: yup.string().required('Password is mandatory.'),
});
