import * as yup from "yup";
import {
  confirmPasswordValidation,
  passwordValidationSchema,
} from "./validationSchema";

export const setNewPasswordFormValidation = yup.object({
  ...passwordValidationSchema,
  ...confirmPasswordValidation,
});
