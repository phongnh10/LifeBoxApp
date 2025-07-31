import { call, put, takeLatest } from 'redux-saga/effects';
import i18n from '../../../i18n';
import { showToast } from '../../components/toast/toast';

import {
  createNote,
  updateNote,
  deleteNote,
  getNotesByUser,
} from '../../api/notesApi';
import {
  createRequest,
  createSuccess,
  createFailure,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} from './noteSlice';

// Create Note
function* handleCreateNote(action) {
  try {
    const { note } = action.payload;
    const newNote = yield call(createNote, note);
    yield put(createSuccess(newNote));
    showToast('success', i18n.t('note.noteSaved'));
  } catch (error) {
    yield put(createFailure(error.message));
    showToast('error', error.message);
  }
}

// Fetch Notes
function* handleFetchNotes(action) {
  try {
    const { userId } = action.payload;
    const notes = yield call(getNotesByUser, userId);
    yield put(fetchSuccess(notes));
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

// Update Note
function* handleUpdateNote(action) {
  try {
    const { note } = action.payload;
    yield call(updateNote, note);
    yield put(updateSuccess(note));
    showToast('success', i18n.t('note.noteUpdated'));
  } catch (error) {
    yield put(updateFailure(error.message));
    showToast('error', error.message);
  }
}

// Delete Note
function* handleDeleteNote(action) {
  try {
    const { noteId } = action.payload;
    yield call(deleteNote, noteId);
    yield put(deleteSuccess(noteId));
    showToast('success', i18n.t('note.noteDeleted'));
  } catch (error) {
    yield put(deleteFailure(error.message));
    showToast('error', error.message);
  }
}

export default function* noteSaga() {
  yield takeLatest(createRequest.type, handleCreateNote);
  yield takeLatest(fetchRequest.type, handleFetchNotes);
  yield takeLatest(updateRequest.type, handleUpdateNote);
  yield takeLatest(deleteRequest.type, handleDeleteNote);
}
