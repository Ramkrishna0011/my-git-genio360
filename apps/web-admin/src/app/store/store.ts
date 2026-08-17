import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/auth/store/auth.slice';

/**
 * Root Redux store — composition root for feature-owned slices. Reserved for complex,
 * shared business state; localized state (theme, UI prefs) belongs in React Context instead.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
