import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type userType = {
  name: string;
  email: string;
  movies: {};
};

const userCollections = firestore().collection('users');

const createUser = async (name: string, email: string) => {
  try {
    await userCollections.doc(email).set({
      name: name,
      email: email,
      notes: {},
    });
    console.log('userAdded and created');
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (name: string, email: string) => {
  try {
    await userCollections.doc(email).update({
      name,
      email,
    });
  } catch (error) {
    console.log(error);
  }
};

export {createUser, userCollections, editUser};
export type {userType};
