import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';
import i18n from '../../../i18n';

// login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await userApi.loginUser({
        username,
        password,
      });

      if (!user) {
        return rejectWithValue(i18n.t('messages.invalidCredentials'));
      }

      return user;
    } catch (error) {
      return rejectWithValue(i18n.t('messages.somethingWentWrong'));
    }
  },
);

// create
export const createUser = createAsyncThunk(
  'user/create',
  async (userData, { rejectWithValue }) => {
    try {
      const existingUser = await userApi.getUserByUsername(userData.username);
      if (existingUser) {
        return rejectWithValue(i18n.t('messages.emailAlreadyExists'));
      }

      const id = await userApi.createUser({
        ...userData,
      });

      return { ...userData, id, password: null };
    } catch (error) {
      return rejectWithValue(
        error.message || i18n.t('messages.somethingWentWrong'),
      );
    }
  },
);
