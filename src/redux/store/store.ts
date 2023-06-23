import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, createSelector} from '@reduxjs/toolkit';

import { initialStateType, notesReducer } from '../slice/notesSlice';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedNotesReducer = persistReducer(persistConfig, notesReducer);

const store = configureStore({
  reducer: {
    notesReducer: persistedNotesReducer,
  },
});

const persistor = persistStore(store);

const createNotes: (state: RootState) => Array<initialStateType> = state =>
state.notesReducer;

const createNotesSelector = createSelector(createNotes, state => state)

export {store, persistor, createNotesSelector};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
