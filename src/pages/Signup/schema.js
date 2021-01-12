import * as yup from "yup";

const signupSchema = yup.object().shape({
  // username: yup.string().nullable().min(8),
  email: yup.string().email().required(),
  password: yup.string().min(2).required(),
  confirmPassword: yup.string().required(),
  // bio: yup.string().required(),
});

export default signupSchema;
