import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  register: { loading: false, error: null, success: false },
  login: { loading: false, error: null, success: false },
  fetch: { loading: false, error: null, success: false },
  delete: { loading: false, error: null, success: false },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ===== REGISTER =====
    registerRequest: state => {
      state.register = { loading: true, error: null, success: false };
    },
    registerSuccess: (state, action) => {
      state.register = { loading: false, error: null, success: true };
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.register = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },

    // ===== LOGIN =====
    loginRequest: state => {
      state.login = { loading: true, error: null, success: false };
    },
    loginSuccess: (state, action) => {
      state.login = { loading: false, error: null, success: true };
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.login = { loading: false, error: action.payload, success: false };
    },

    // ===== FETCH USER =====
    fetchUserRequest: state => {
      state.fetch = { loading: true, error: null, success: false };
    },
    fetchUserSuccess: (state, action) => {
      state.fetch = { loading: false, error: null, success: true };
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.fetch = { loading: false, error: action.payload, success: false };
    },

    // ===== DELETE USER =====
    deleteUserRequest: state => {
      state.delete = { loading: true, error: null, success: false };
    },
    deleteUserSuccess: state => {
      state.delete = { loading: false, error: null, success: true };
      state.user = null;
    },
    deleteUserFailure: (state, action) => {
      state.delete = { loading: false, error: action.payload, success: false };
    },

    // ===== LOGOUT =====
    logout: state => {
      state.user = null;
      state.register = { loading: false, error: null, success: false };
      state.login = { loading: false, error: null, success: false };
      state.fetch = { loading: false, error: null, success: false };
      state.delete = { loading: false, error: null, success: false };
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;

/** ✅ Selectors gọn trong 1 object */
export const userSelectors = {
  user: state => state.user.user,

  register: state => state.user.register,
  login: state => state.user.login,
  fetch: state => state.user.fetch,
  delete: state => state.user.delete,

  // Nếu cần nhanh:
  isRegisterLoading: state => state.user.register.loading,
  isLoginLoading: state => state.user.login.loading,
};
