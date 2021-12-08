import React, { useContext, useState } from "react"
import { Text, SafeAreaView, TextInput, FlatList } from "react-native";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Context } from "../../../../DependencyInjector";
import Word from "../../domain/entities/word";
import { inputState } from "../recoil/atoms";
import debounce from "lodash/debounce";

const WordRhymePage: React.FC = () => {
  const setInput = useSetRecoilState(inputState);
  const [debouncedSetInput] = useState(() => debounce(setInput, 800));
  const dependencies = useContext(Context);

  const onInputChange = async (text: string) => {
    debouncedSetInput(text);
  }

  const buildRhymes = () => {
    const rhymesLoadable = useRecoilValueLoadable(dependencies.wordSelectorManager.rhymesQuery);

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
      renderItem={({item}) => <Text>{item.word} - {item.numSyllables} syllables</Text>}
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