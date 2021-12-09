import { BlocBuilder } from "@felangel/react-bloc";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput, StyleSheet } from "react-native";
import { container } from "tsyringe";
import Word from "../../domain/entities/word";
import RhymesBloc from "../bloc/rhymes-bloc";
import { GetRhymesEvent } from "../bloc/rhymes-event";
import { RhymesError, RhymesLoaded, RhymesLoading, RhymesState } from "../bloc/rhymes-state";
import debounce from 'lodash/debounce';

const WordRhymePage: React.FC = () => {
  const rhymesBloc = container.resolve(RhymesBloc);

  const handleChangeText = (text: string) => {
    rhymesBloc.add(new GetRhymesEvent(text));
  }

  const [debouncedHandleChangeText] = useState(() => debounce(handleChangeText, 500));

  const buildRhymes = (state: RhymesState) => {
    switch (state.constructor) {
      case RhymesLoading:
        return buildLoading();
      case RhymesLoaded:
        return buildLoaded((state as RhymesLoaded).rhymes);
      case RhymesError:
        return buildError((state as RhymesError).message);
      default:
        return buildInitial();
    }
  }

  const buildInitial = () => <Text>Enter a word to see rhymes</Text>;

  const buildLoading = () => <Text>Loading...</Text>;

  const buildLoaded = (rhymes: Word[]) => {
    return <FlatList 
      keyExtractor={(item, _) => item.word}
      data={rhymes}
      renderItem={({item}) => <Text style={styles.item}>{item.word}</Text>}
    />
  }

  const buildError = (message: string) => <Text>{message}</Text>;

  return <SafeAreaView>
    <TextInput 
      style={styles.input}
      onChangeText={debouncedHandleChangeText}
      placeholder="Search for words that rhyme with..."
    />
    <BlocBuilder<RhymesBloc, RhymesState> 
      bloc={rhymesBloc}
      builder={(state) => buildRhymes(state)}
    />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default WordRhymePage;