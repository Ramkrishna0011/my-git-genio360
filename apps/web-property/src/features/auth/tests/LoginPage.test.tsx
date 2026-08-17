import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../store/auth.slice';
import { router } from '../../../app/router/router';
import { queryClient } from '../../../lib/query/queryClient';

describe('LoginPage', () => {
  it('renders the sign-in form with accessible, labelled fields', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ReduxProvider>,
    );

    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
});
