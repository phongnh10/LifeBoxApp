import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  note: null, // Note hiện tại (đang xem/chỉnh sửa)
  notes: [], // Danh sách tất cả notes
  createNote: { loading: false, error: null, success: false },
  updateNote: { loading: false, error: null, success: false },
  fetch: { loading: false, error: null, success: false },
  deleteNote: { loading: false, error: null, success: false },
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // create
    createRequest: state => {
      state.createNote = { loading: true, error: null, success: false };
    },
    createSuccess: (state, action) => {
      state.createNote = { loading: false, error: null, success: true };
      state.notes.push(action.payload);
      state.note = action.payload; // Gán note vừa tạo làm note hiện tại
    },
    createFailure: (state, action) => {
      state.createNote = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetCreateState: state => {
      state.createNote = { loading: false, error: null, success: false };
    },

    // fetch
    fetchRequest: state => {
      state.fetch = { loading: true, error: null, success: false };
    },
    fetchSuccess: (state, action) => {
      state.fetch = { loading: false, error: null, success: true };
      state.notes = action.payload;
      state.note = action.payload[0] || null;
    },
    fetchFailure: (state, action) => {
      state.fetch = { loading: false, error: action.payload, success: false };
    },
    resetFetchState: state => {
      state.fetch = { loading: false, error: null, success: false };
    },

    // update
    updateRequest: state => {
      state.updateNote = { loading: true, error: null, success: false };
    },
    updateSuccess: (state, action) => {
      state.updateNote = { loading: false, error: null, success: true };
      const index = state.notes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) state.notes[index] = action.payload;
      if (state.note?.id === action.payload.id) {
        state.note = action.payload;
      }
    },
    updateFailure: (state, action) => {
      state.updateNote = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetUpdateState: state => {
      state.updateNote = { loading: false, error: null, success: false };
    },

    // delete
    deleteRequest: state => {
      state.deleteNote = { loading: true, error: null, success: false };
    },
    deleteSuccess: (state, action) => {
      state.deleteNote = { loading: false, error: null, success: true };
      state.notes = state.notes.filter(n => n.id !== action.payload);
      if (state.note?.id === action.payload) {
        state.note = null;
      }
    },
    deleteFailure: (state, action) => {
      state.deleteNote = {
        loading: false,
        error: action.payload,
        success: false,
      };
    },
    resetDeleteState: state => {
      state.deleteNote = { loading: false, error: null, success: false };
    },

    // rest
    resetNoteState: () => initialState,
  },
});

export const {
  createRequest,
  createSuccess,
  createFailure,
  resetCreateState,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  resetFetchState,
  updateRequest,
  updateSuccess,
  updateFailure,
  resetUpdateState,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
  resetDeleteState,
  resetNoteState,
} = noteSlice.actions;

export default noteSlice.reducer;

// Selectors
export const noteSelectors = {
  notes: state => state.note.notes,
  currentNote: state => state.note.note,
  create: state => state.note.createNote,
  fetch: state => state.note.fetch,
  update: state => state.note.updateNote,
  delete: state => state.note.delete,
};
