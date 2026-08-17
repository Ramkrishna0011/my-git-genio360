import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address.')
    .required('Enter your email and password.'),
  password: yup.string().required('Enter your email and password.'),
  remember: yup.boolean().default(true),
});
export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address.')
    .required('Enter your email address.'),
});
export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password must be at least 8 characters.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match.')
    .required('Passwords do not match.'),
});
export type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>;
