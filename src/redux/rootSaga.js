import { all } from 'redux-saga/effects';
import userSaga from './user/userSaga';
import noteSaga from './note/noteSaga';

export default function* rootSaga() {
  yield all([userSaga(), noteSaga()]);
}
