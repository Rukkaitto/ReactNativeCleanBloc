import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface RoundedTextInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
}

const RoundedTextInput: React.FC<RoundedTextInputProps> = (props) => {
  return <TextInput 
    style={styles.input} 
    onChangeText={props.onChangeText}
    placeholder={props.placeholder}
  />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default RoundedTextInput;