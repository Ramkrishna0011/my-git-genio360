import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../validation/auth.schema';
import { authService } from '../services/auth.service';

export function useForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  // No account enumeration: the Core API returns the same response either way, so a
  // successful call always means "we sent it if the account exists" — only a malformed
  // email (400) is surfaced as a distinct error.
  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (_data, variables) => {
      setSubmittedEmail(variables.email);
      setSent(true);
    },
    onError: (error: AxiosError) => {
      if (!error.response) setServerError('Cannot reach the server. Please try again.');
      else if (error.response.status === 400) setServerError('Enter a valid email address.');
      else setServerError('Something went wrong. Please try again.');
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setServerError(null);
    mutation.mutate(values);
  });

  return { form, onSubmit, isSubmitting: mutation.isPending, error: serverError, sent, email: submittedEmail };
}
