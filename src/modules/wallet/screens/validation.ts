import * as yup from 'yup';
import { accountNoValidator, bankValidator, optionValidator } from '../../../common';

export const bankAccountValidation = yup.object({
  accountNo: accountNoValidator,
  bankID: bankValidator,
  isPrimary: optionValidator,
});
