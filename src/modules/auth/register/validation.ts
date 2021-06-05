import * as yup from 'yup';
import {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  cPasswordValidator,
} from '../../../common';

export const registerValidationSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
  cPassword: cPasswordValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
});
