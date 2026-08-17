import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SessionUser } from '../../../types/auth';

interface AuthState {
  user: SessionUser | null;
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionUser>) {
      state.user = action.payload;
    },
    clearSession(state) {
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
