import * as yup from "yup";
import { emailValidationSchema } from "./validationSchema";

export const forgotpasswordFormValidation = yup.object({
  ...emailValidationSchema,
});
