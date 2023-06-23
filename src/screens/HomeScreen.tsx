import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';
import Notes from '../components/Notes';
import {useSelector} from 'react-redux';
import {createNotesSelector} from '../redux/store/store';
import {FlatList} from 'react-native-gesture-handler';
import {initialStateType} from '../redux/slice/notesSlice';
import {it} from '@jest/globals';

const HomeScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  const notesSelector: Array<initialStateType> =
    useSelector(createNotesSelector);
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="add"
        size={25}
        color={'black'}
        style={styles.addButton}
        onPress={() => navigation.navigate('NotesScreen')}
      />
      <FlatList
        data={notesSelector}
        keyExtractor={item => item.id.toString()}
        renderItem={item => (
          <Notes
            id={item.item.id}
            title={item.item.title}
            body={item.item.body}
            onPress={() => {}}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 35,
    right: 20,
    padding: 15,
    backgroundColor: '#008080',
    borderRadius: 10,
  },
});
