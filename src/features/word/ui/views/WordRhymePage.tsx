import React, { useContext } from "react"
import { Text, SafeAreaView, TextInput, FlatList } from "react-native";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Context } from "../../../../DependencyInjector";
import Word from "../../domain/entities/word";
import { inputState } from "../recoil/atoms";

const WordRhymePage: React.FC = () => {
  const setInput = useSetRecoilState(inputState);
  const selectors = useContext(Context);

  const onInputChange = async (text: string) => {
    setInput(text);
  }

  const buildRhymes = () => {
    const rhymesLoadable = useRecoilValueLoadable(selectors.wordSelectorManager.rhymesQuery);

    switch (rhymesLoadable.state) {
      case 'hasValue':
        return buildLoaded(rhymesLoadable.contents);
      case 'loading':
        return buildLoading();
      case 'hasError':
        return buildError((rhymesLoadable.contents as Error).message);
      default:
        break;
    }
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
    <TextInput onChangeText={onInputChange} />
    {buildRhymes()}
  </SafeAreaView>;
}

export default WordRhymePage;