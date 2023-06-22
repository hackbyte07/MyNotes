import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootScreens} from '../navigation/RootNavigation';

const HomeScreen = ({navigation}: StackScreenProps<RootScreens>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon name="add" size={25} color={'black'} style={styles.addButton} />
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
    backgroundColor: 'green',
    borderRadius: 10,
  },
});
