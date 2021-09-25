import * as yup from 'yup';
import {
  firstNameValidator,
  genderValidator,
  lastNameValidator,
  birthValidator,
  educationValidator,
  vacinatedValidator,
} from '../../../common';

export const personalInfoValidation = yup.object({
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  gender: genderValidator,
  birthDate: birthValidator,
  educationLevelID: educationValidator,
  vaccinated: vacinatedValidator,
});
