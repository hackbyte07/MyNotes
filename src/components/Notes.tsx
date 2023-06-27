import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {FC} from 'react';
import {initialStateType} from '../redux/slice/notesSlice';

const {height, width} = Dimensions.get('screen');

type props = {
  title: string;
  body: string;
  onPress: () => void;
};

const Notes: FC<props> = ({title, body, onPress}) => {
  console.log(title + ' body is ' + body);
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
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    height: height / 6,
    width: width / 2.5,
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
