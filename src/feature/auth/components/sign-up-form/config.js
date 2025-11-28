import * as yup from "yup";

export const signUpFormSchemaValidation = yup.object({
  name: yup.string().max(20).trim().required(),
  email: yup.string().email().trim().required(),
  password: yup.string().max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
