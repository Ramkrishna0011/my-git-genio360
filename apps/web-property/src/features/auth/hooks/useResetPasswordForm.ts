import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../validation/auth.schema';
import { authService } from '../services/auth.service';

export function useResetPasswordForm(token: string | undefined) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const mutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => setDone(true),
    onError: (error: AxiosError) => {
      if (!error.response) setServerError('Cannot reach the server. Please try again.');
      else if (error.response.status === 400) setServerError('This reset link is invalid or has expired.');
      else setServerError('Could not reset your password. Please try again.');
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setServerError(null);
    if (!token) {
      setServerError('This reset link is invalid or has expired.');
      return;
    }
    mutation.mutate({ token, newPassword: values.newPassword });
  });

  return { form, onSubmit, isSubmitting: mutation.isPending, error: serverError, done };
}
