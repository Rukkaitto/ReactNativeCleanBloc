import 'reflect-metadata';
import React from 'react';
import { View } from 'react-native';
import WordRhymePage from './features/word/ui/views/WordRhymePage';

const App: React.FC = () => {
  return (
    <View>
      <WordRhymePage></WordRhymePage>
    </View>
  );
};

export default App;