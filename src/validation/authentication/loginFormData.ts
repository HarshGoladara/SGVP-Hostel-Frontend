import * as yup from "yup";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "./validationSchema";

export const loginFormValidation = yup.object({
  ...emailValidationSchema,
  ...passwordValidationSchema,
});
