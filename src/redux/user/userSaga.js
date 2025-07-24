import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createUser,
  loginUser,
  getUserByUsername,
  deleteUser,
} from '../../api/usersApi';
import {
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
} from './userSlice';

import {
  goToLogin,
  goToMainTab,
  goToRegister,
} from '../../navigator/navigationActions';
import i18n from '../../../i18n';
import { showToast } from '../../components/toast/toast';

// register
function* handleRegister(action) {
  try {
    const { username } = action.payload;
    const checkUsername = yield call(getUserByUsername, username);
    if (checkUsername) {
      yield put(registerFailure(i18n.t('messages.emailAlreadyExists')));
      showToast(
        'error',
        i18n.t('messages.error'),
        i18n.t('messages.emailAlreadyExists'),
      );
      return;
    }
    const user = yield call(createUser, action.payload);
    if (!user) throw new Error('Register failed');

    yield put(registerSuccess(user));
    showToast(
      'success',
      i18n.t('messages.success'),
      i18n.t('messages.registrationSuccess'),
    );

    goToLogin();
  } catch (error) {
    yield put(
      registerFailure(error.message || i18n.t('messages.somethingWentWrong')),
    );
    showToast(
      'error',
      i18n.t('messages.error'),
      error.message || i18n.t('messages.somethingWentWrong'),
    );
  }
}

// login
function* handleLogin(action) {
  try {
    const user = yield call(loginUser, action.payload);
    if (!user) throw new Error(i18n.t('messages.invalidCredentials'));

    yield put(loginSuccess(user));
    showToast(
      'success',
      i18n.t('messages.success'),
      i18n.t('messages.loginSuccess'),
    );

    goToMainTab();
  } catch (error) {
    yield put(
      loginFailure(error.message || i18n.t('messages.somethingWentWrong')),
    );
    showToast(
      'error',
      i18n.t('messages.error'),
      error.message || i18n.t('messages.somethingWentWrong'),
    );
  }
}

// fetch user
function* handleFetchUser(action) {
  try {
    const user = yield call(getUserByUsername, action.payload);
    if (!user) throw new Error(i18n.t('messages.userNotFound'));

    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
    showToast('error', i18n.t('messages.error'), error.message);
  }
}

// delete user
function* handleDeleteUser(action) {
  try {
    yield call(deleteUser, action.payload);
    yield put(deleteUserSuccess());
    showToast(
      'success',
      i18n.t('messages.success'),
      i18n.t('messages.updateSuccess'),
    );
  } catch (error) {
    yield put(deleteUserFailure(error.message));
    showToast('error', i18n.t('messages.error'), error.message);
  }
}

export default function* userSaga() {
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(fetchUserRequest.type, handleFetchUser);
  yield takeLatest(deleteUserRequest.type, handleDeleteUser);
}
