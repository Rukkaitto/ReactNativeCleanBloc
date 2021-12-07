import React, { useState } from "react"
import { View, Text, SafeAreaView, TextInput } from "react-native";
import { useBloc } from "../../../../state";
import Word from "../../domain/entities/word";
import RhymesCubit from "../cubits/rhymes-cubit";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "../cubits/rhymes-state";

const WordRhymePage: React.FC = () => {
  const [rhymes, {getRhymes}] = useBloc(RhymesCubit);

  const onInputChange = async (text: string) => {
    await getRhymes(text);
  }

  const buildRhymes = (state: RhymesState) => {
    if(state instanceof RhymesLoading) {
      return <Text>Loading...</Text>;
    } else if(state instanceof RhymesLoaded) {
      return state.rhymes.map((rhyme: Word) => {
        return <Text>{rhyme.word}</Text>;
      });
    } else if(state instanceof RhymesError) {
      return <Text>{state.message}</Text>;
    }
  }

  return <SafeAreaView>
    <TextInput onChangeText={onInputChange}>Test</TextInput>
    {buildRhymes(rhymes)}
  </SafeAreaView>;
}

export default WordRhymePage;