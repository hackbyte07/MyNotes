import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {number, string} from 'yup';


type initialStateType = {
  id: number;
  title: string;
  body: string;
};

const initialState: Array<initialStateType> = [
  {
    id: 0,
    title: '',
    body: '',
  },
];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    insertNote: (state, action: PayloadAction<initialStateType>) => {
      state.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<initialStateType>) => {
      const index = state.indexOf(action.payload);
      state[index] = action.payload;
      return state;
    },
    deleteNote: (state, action: PayloadAction<initialStateType>) => {
      return state.filter(it => {
        it.id !== action.payload.id;
      });
    },
  },
});


export type {
    initialStateType
}

export const notesReducer = notesSlice.reducer
export const {insertNote, deleteNote, updateNote} = notesSlice.actions