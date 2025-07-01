import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Obtener sesión previa del localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  // Simulación simple: acepta cualquier usuario y devuelve token simulado
  if (username && password) {
    return { username, token: 'fake-token-1234' };
  }
  throw new Error('Credenciales inválidas');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!storedToken,
    user: storedUser || null,
    token: storedToken || null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { username, token } = action.payload;
        state.isAuthenticated = true;
        state.user = username;
        state.token = token;
        state.status = 'success';

        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(username));
        localStorage.setItem('token', token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
