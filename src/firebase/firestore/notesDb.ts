import {initialStateType} from '../../redux/slice/notesSlice';
import {userCollections} from './userDb';
import auth from '@react-native-firebase/auth';

const notesCollection = userCollections
  .doc(auth().currentUser?.email?.toString())
  .collection('notes');

const saveNoteFb = async (note: initialStateType) => {
  try {
    await notesCollection.doc(note.id.toString()).set(note);
    console.log('note added to firebase');
  } catch (error) {
    console.log(error);
  }
};

const deleteNoteFb = async (noteId: number) => {
  try {
    await notesCollection.doc(noteId.toString()).delete();
    console.log('movie deleted successfully from firebase');
  } catch (error) {
    console.log('error');
  }
};


export {
    saveNoteFb,
    deleteNoteFb,
    notesCollection
}