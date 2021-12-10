import { BlocBuilder } from "@felangel/react-bloc";
import React, { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import Word from "../../domain/entities/word";
import RhymesBloc from "../bloc/rhymes.bloc";
import { RhymesError, RhymesLoaded, RhymesLoading, RhymesState } from "../bloc/rhymes.state";
import WordRhymeTextField from "../components/WordRhymeTextField";
import { RhymesBlocContext } from "../context/rhymes.bloc.context";

const WordRhymePage: React.FC = () => {
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

  const buildError = (message: string) => <Text style={styles.error}>{message}</Text>;

  return <SafeAreaView>
    <WordRhymeTextField/>
    <BlocBuilder<RhymesBloc, RhymesState> 
      bloc={useContext(RhymesBlocContext)}
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
  error: {
    color: 'red',
  }
});

export default WordRhymePage;