import { debounce } from "lodash";
import React, { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { GetRhymesEvent } from "../bloc/rhymes.event";
import { RhymesBlocContext } from "../context/rhymes.bloc.context";

const WordRhymeTextField: React.FC = () => {
  const rhymesBloc = useContext(RhymesBlocContext);

  const handleChangeText = (text: string) => {
    rhymesBloc.add(new GetRhymesEvent(text));
  }

  const [debouncedHandleChangeText] = useState(() => debounce(handleChangeText, 500));

  return <TextInput 
    style={styles.input}
    onChangeText={debouncedHandleChangeText}
    placeholder="Search for words that rhyme with..."
  />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default WordRhymeTextField;