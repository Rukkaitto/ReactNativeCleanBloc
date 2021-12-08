import React from 'react';
import { View } from 'react-native';
import { RecoilRoot } from 'recoil';
import DependencyInjector from './DependencyInjector';
import WordRhymePage from './features/word/ui/views/WordRhymePage';


const App: React.FC = () => {
  return (
    <DependencyInjector>
      <View>
        <RecoilRoot>
          <WordRhymePage/>
        </RecoilRoot>
      </View>
    </DependencyInjector>
  );
};

export default App;