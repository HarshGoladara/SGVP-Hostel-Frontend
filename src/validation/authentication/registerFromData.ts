import * as yup from "yup";
import {
  confirmPasswordValidation,
  emailValidationSchema,
  passwordValidationSchema,
} from "./validationSchema";

export const registerFormValidation = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema,
  ...confirmPasswordValidation,
});
