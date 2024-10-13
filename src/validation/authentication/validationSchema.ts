import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const emailValidationSchema = {
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email required"),
};

const passwordValidationSchema = {
  password: yup
    .string()
    .required("Password required")
    .minLowercase(1, "Password should contain at least 1 lowercase character")
    .minUppercase(1, "Password should contain at least 1 uppercase character")
    .minSymbols(1, "Password should contain at least 1 special character")
    .minNumbers(2, "Password should contain at least 1 numeric character")
    .min(8, "Minimum 8 character")
    .trim("Password should not contain white spaces")
    .required("Password required"),
};

const confirmPasswordValidation = {
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "confirm password must match")
    .required("confirm password required"),
};

export {
  emailValidationSchema,
  passwordValidationSchema,
  confirmPasswordValidation,
};
