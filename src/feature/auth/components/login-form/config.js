import * as yup from "yup";

export const loginFormSchemaValidation = yup.object({
  email: yup.string().email().trim().required(),
  password: yup.string().required(),
});
