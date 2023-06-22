import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';

type props = {
  onValueChange: (newValue: string | React.ChangeEvent<any>) => void;
  onBlur: () => void;
  placeholder: string;
  isSecure: boolean;
};

const {width} = Dimensions.get('screen');

const AuthTextInput: FC<props> = ({
  onValueChange,
  onBlur,
  placeholder,
  isSecure,
}) => {
  return (
    <TextInput
      onChangeText={newValue => onValueChange(newValue)}
      secureTextEntry={isSecure}
      style={styles.container}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 5,
    fontSize: 16,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    paddingHorizontal: 10,
    width: width - 30,
  },
});
