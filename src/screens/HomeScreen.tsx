import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';
import Notes from '../components/Notes';
import {useSelector} from 'react-redux';

import {initialStateType} from '../redux/slice/notesSlice';
import {FloatingAction} from 'react-native-floating-action';
import {RootState} from '../redux/store/store';
import {notesCollection} from '../firebase/firestore/notesDb';

const HomeScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  const notesSelector: Array<initialStateType> = useSelector<RootState>(
    state => {
      console.log(Array.isArray(state.notes));
      return state.notes;
    },
  ) as Array<initialStateType>;

  useEffect(() => {
    const subscriber = notesCollection.onSnapshot(documentSnapshot => {});

    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 7.5,
        }}
        data={notesSelector}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={item => (
          <Notes
            title={item.item.title}
            body={item.item.body}
            onPress={() => {
              console.log(item.item.id);
              navigation.navigate('SavedNotesScreen', {note: item.item});
            }}
          />
        )}
      />
      <FloatingAction
        overrideWithAction={true}
        actions={[
          {name: 'open', icon: <Icon name="add" size={25} color={'white'} />},
        ]}
        onPressItem={name => {
          if (name === 'open') {
            navigation.navigate('NotesScreen');
          }
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
