import React from "react"
import { Text, SafeAreaView, TextInput, FlatList } from "react-native";
import { useBloc } from "../../../../state";
import Word from "../../domain/entities/word";
import RhymesCubit from "../cubits/rhymes-cubit";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "../cubits/rhymes-state";

const WordRhymePage: React.FC = () => {
  const [rhymesState, {getRhymes}] = useBloc(RhymesCubit);

  const onInputChange = async (text: string) => {
    getRhymes(text);
  }

  const buildRhymes = (state: RhymesState) => {
    if(state instanceof RhymesInitial) {
      return buildInitial();
    } else if(state instanceof RhymesLoading) {
      return buildLoading();
    } else if(state instanceof RhymesLoaded) {
      return buildLoaded(state.rhymes);
    } else if(state instanceof RhymesError) {
      return buildError(state.message);
    }
  }

  const buildInitial = () => {
    return <Text>Enter a word to see rhymes</Text>
  }

  const buildLoading = () => {
    return <Text>Loading...</Text>;
  }

  const buildLoaded = (rhymes: Word[]) => {
    return <FlatList data={rhymes} renderItem={({item}) => <Text>{item.word}</Text>} />
  }

  const buildError = (message: string) => {
    return <Text>{message}</Text>;
  }

  return <SafeAreaView>
    <TextInput onChangeText={onInputChange} />
    {buildRhymes(rhymesState)}
  </SafeAreaView>;
}

export default WordRhymePage;