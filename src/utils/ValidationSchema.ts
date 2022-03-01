import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "Invalid name!")
    .required("Name is required!"),
  lastName: Yup.string()
    .trim()
    .min(2, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Password does not match!"
  ),
});
