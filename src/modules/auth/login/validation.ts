import * as yup from 'yup';
import { emailValidator, passwordValidator } from '../../../common';

export const loginValidationSchema = yup.object({
  email: emailValidator,
  password: passwordValidator,
});
