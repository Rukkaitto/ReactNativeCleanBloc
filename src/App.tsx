import React from 'react';
import { View } from 'react-native';
import "reflect-metadata";
import "./di";
import { rhymesBloc, RhymesBlocContext } from './features/word/ui/context/rhymes.bloc.context';
import WordRhymePage from './features/word/ui/views/WordRhymePage';

const App: React.FC = () => {
  return (
    <View>
      <RhymesBlocContext.Provider value={rhymesBloc}>
        <WordRhymePage></WordRhymePage>
      </RhymesBlocContext.Provider>
    </View>
  );
};

export default App;