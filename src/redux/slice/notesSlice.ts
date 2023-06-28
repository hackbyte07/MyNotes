import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {number, string} from 'yup';

type initialStateType = {
  id: number;
  title: string;
  body: string;
};

const initialState: Array<initialStateType> = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    insertNote: (state, action: PayloadAction<initialStateType>) => {
      let array: Array<initialStateType> = [...state, action.payload];

      return array;
    },
    updateNote: (state, action: PayloadAction<initialStateType>) => {
      state.forEach(it => {
        if (it.id === action.payload.id) {
           it.title = action.payload.title;
          it.body = action.payload.body;
          console.log(it.title)
        }
      });
      return state;
    },
    deleteNote: (state, action: PayloadAction<initialStateType>) => {
      return state.filter(it => {
        it.id !== action.payload.id;
      });
    },
  },
});

export type {initialStateType};

export const notesReducer = notesSlice.reducer;
export const {insertNote, deleteNote, updateNote} = notesSlice.actions;
