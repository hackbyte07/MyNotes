import {StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store/store';
import {insertNote} from '../redux/slice/notesSlice';
import {saveNoteFb} from '../firebase/firestore/notesDb';

const NotesScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    console.log('save is pressed');
    if (title.trim().length < 1 || body.trim().length < 1) {
      console.log('data not valid');
      return;
    }
    console.log('data is valid');
    const note = {id: Date.now(), title, body};
    dispatch(insertNote(note));
    saveNoteFb(note);
    console.log('note saved');
    navigation.pop();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="save"
          size={25}
          color={'black'}
          style={{marginRight: 15}}
          onPress={handlePress}
        />
      ),
    });
  }, [navigation, title, body]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={title}
        onChangeText={newValue => setTitle(newValue)}
        placeholder="Title"
        style={styles.title}
      />
      <TextInput
        value={body}
        onChangeText={newValue => setBody(newValue)}
        placeholder="Add text here..."
        style={styles.body}
      />
    </SafeAreaView>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 18,
    color: 'black',
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
  },

  body: {
    marginTop: 15,
    fontSize: 16,
    color: 'black',
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
  },
});
