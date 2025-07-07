import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');
const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password, isAdmin }) => {
    if (username && password) {
      return { username, token: 'fake-token-1234', isAdmin };
    }
    throw new Error('Credenciales inválidas');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!storedToken,
    user: storedUser || null,
    token: storedToken || null,
    isAdmin: storedIsAdmin || false,
    status: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { username, token, isAdmin } = action.payload;
        state.isAuthenticated = true;
        state.user = username;
        state.token = token;
        state.isAdmin = isAdmin;
        state.status = 'success';

        localStorage.setItem('user', JSON.stringify(username));
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin);
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
