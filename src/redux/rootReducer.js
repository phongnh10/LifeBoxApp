import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import noteReducer from './note/noteSlice';

const rootReducer = combineReducers({
  user: userReducer,
  note: noteReducer,
});

export default rootReducer;
