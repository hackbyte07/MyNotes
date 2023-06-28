import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {updateNote} from '../redux/slice/notesSlice';

const SavedNotesScreen = ({
  navigation,
  route,
}: StackScreenProps<RootScreens, 'SavedNotesScreen'>) => {
  const data = route.params.note;

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(data.title);
  const [body, setBody] = useState<string>(data.body);

  const handleUpdate = () => {
    console.log('update note called');
    updateNote(data);
    setEditMode(false)
    console.log('note updated');
  };

  useEffect(() => {
    editMode
      ? navigation.setOptions({
          headerRight: () => (
            <Icon
              name="save"
              size={25}
              style={{marginRight: 15}}
              onPress={handleUpdate}
            />
          ),
          headerLeft: () => (
            <Icon
              name="close"
              size={25}
              style={{marginLeft: 15}}
              onPress={() => setEditMode(false)}
            />
          ),
        })
      : navigation.setOptions({
          headerRight: () => (
            <Icon
              name="edit"
              size={25}
              style={{marginRight: 15}}
              onPress={() => {
                setEditMode(true);
              }}
            />
          ),
          headerLeft: () => (
            <Icon
              name="arrow-back"
              style={{marginLeft: 15}}
              size={25}
              onPress={() => navigation.pop()}
            />
          ),
        });
  }, [navigation, editMode, title, body]);

  return (
    <SafeAreaView style={styles.container}>
      {editMode ? (
        <View>
          <TextInput
            value={title}
            onChangeText={newValue => setTitle(newValue)}
            placeholder="Title"
            style={styles.titleInput}
          />
          <TextInput
            value={body}
            onChangeText={newValue => setBody(newValue)}
            placeholder="Add text here..."
            style={styles.bodyInput}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.body}>{data.body}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SavedNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },

  body: {
    marginTop: 15,
    fontSize: 18,
  },
  titleInput: {
    fontSize: 18,
    color: 'black',
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
  },

  bodyInput: {
    marginTop: 15,
    fontSize: 16,
    color: 'black',
    borderBottomColor: 'dodgerblue',
    borderBottomWidth: 2,
  },
});
