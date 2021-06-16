import * as yup from 'yup';
import { firstNameValidator, genderValidator, lastNameValidator, mobileValidator } from '../../../common';

export const personalInfoValidation = yup.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  mobile: mobileValidator,
  gender: genderValidator,
});
