import debounce from "lodash/debounce";
import React, { useContext, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Context } from "../../../../DependencyInjector";
import RoundedTextInput from "../components/RoundedTextInput";
import { inputState } from "../recoil/atoms";

const WordRhymePage: React.FC = () => {
  const setInput = useSetRecoilState(inputState);
  const [debouncedSetInput] = useState(() => debounce(setInput, 500));
  const dependencies = useContext(Context);

  const onInputChange = async (text: string) => {
    debouncedSetInput(text);
  }

  const buildRhymes = () => {
    const rhymesLoadable = useRecoilValueLoadable(dependencies.wordSelectorManager.rhymesQuery);

    switch (rhymesLoadable.state) {
      case 'hasValue':
        return <FlatList 
          keyExtractor={(item, _) => item.word} 
          data={rhymesLoadable.contents} 
          renderItem={({item}) => <Text>{item.word} ({item.numSyllables} syllables)</Text>}
        />
      case 'loading':
        return <Text>Loading...</Text>;
      case 'hasError':
        return <Text>{(rhymesLoadable.contents as Error).message}</Text>;
      default:
        break;
    }
  }

  return <SafeAreaView>
    <RoundedTextInput 
      onChangeText={onInputChange}
      placeholder="Search for words that rhyme with..."
    />
    {buildRhymes()}
  </SafeAreaView>;
}

export default WordRhymePage;