import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, createNotesSelector} from '../redux/store/store';
import {insertNote} from '../redux/slice/notesSlice';

const NotesScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const notesSelector = useSelector(createNotesSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = useCallback(() => {
    const inTitle = title.trim();
    const inBody = body.trim();
    if (inTitle.length < 1 || inBody.length < 1) return;
    const newKey = notesSelector[notesSelector.length - 1].id++;
    dispatch(insertNote({id: newKey, title: inTitle, body: inBody}));
    ToastAndroid.show('Note added', 1000)
  }, [notesSelector]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="save"
          size={25}
          color={'black'}
          style={{marginRight: 15}}
          onPress={() => {}}
        />
      ),
    });
  }, [navigation]);

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
