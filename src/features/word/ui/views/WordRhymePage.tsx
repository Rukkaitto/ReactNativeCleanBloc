import { BlocBuilder } from "@felangel/react-bloc";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput } from "react-native";
import { WordRemoteDatasourceImpl } from "../../data/datasources/remote-datasource";
import WordRepositoryImpl from "../../data/repositories/repository-impl";
import Word from "../../domain/entities/word";
import RhymesBloc from "../bloc/rhymes-bloc";
import { GetRhymesEvent } from "../bloc/rhymes-event";
import { RhymesError, RhymesLoaded, RhymesLoading, RhymesState } from "../bloc/rhymes-state";

const WordRhymePage: React.FC = () => {
  const rhymesBloc = new RhymesBloc(new WordRepositoryImpl(new WordRemoteDatasourceImpl(axios.create({ baseURL: "https://api.datamuse.com" }))));

  const handleChangeText = (text: string) => {
    rhymesBloc.add(new GetRhymesEvent(text));
  }

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

  const buildInitial = () => {
    return <Text>Enter a word to see rhymes</Text>
  }

  const buildLoading = () => {
    return <Text>Loading...</Text>;
  }

  const buildLoaded = (rhymes: Word[]) => {
    return <FlatList 
      keyExtractor={(item, _) => item.word}
      data={rhymes}
      renderItem={({item}) => <Text>{item.word}</Text>}
    />
  }

  const buildError = (message: string) => {
    return <Text>{message}</Text>;
  }

  return <SafeAreaView>
    <TextInput onChangeText={handleChangeText}/>
    <BlocBuilder<RhymesBloc, RhymesState> 
      bloc={rhymesBloc}
      builder={(state) => buildRhymes(state)}
    />
  </SafeAreaView>;
}

export default WordRhymePage;