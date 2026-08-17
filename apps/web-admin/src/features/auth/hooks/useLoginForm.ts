import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { loginSchema, type LoginFormValues } from '../validation/auth.schema';
import { authService } from '../services/auth.service';
import { tokenStore } from '../../../lib/auth/tokenStore';
import { useAppDispatch } from '../../../app/store/hooks';
import { setSession } from '../store/auth.slice';

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      tokenStore.set(data.accessToken);
      dispatch(setSession(data.user));
    },
    onError: (error: AxiosError) => {
      if (!error.response) setServerError('Cannot reach the server. Please try again.');
      else if (error.response.status === 401) setServerError('Invalid email or password.');
      else setServerError('Sign-in failed. Please try again.');
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setServerError(null);
    mutation.mutate({ email: values.email, password: values.password });
  });

  return { form, onSubmit, isSubmitting: mutation.isPending, error: serverError };
}
