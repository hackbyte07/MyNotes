import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {FC} from 'react';
import {initialStateType} from '../redux/slice/notesSlice';

const {height, width} = Dimensions.get('screen');

type props = {
  id: number;
  title: string;
  body: string;
  onPress: () => void;
};

const Notes: FC<props> = ({id, title, body, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {body}
      </Text>
    </Pressable>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 15,

    height: height / 6,
    width: width / 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginHorizontal: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 15,
  },
});
