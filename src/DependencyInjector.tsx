import axios from "axios";
import React, { createContext } from "react";
import { WordRemoteDatasourceImpl } from "./features/word/data/datasources/remote-datasource";
import WordRepositoryImpl from "./features/word/data/repositories/repository-impl";
import { inputState } from "./features/word/ui/recoil/atoms";
import WordSelectorManager from "./features/word/ui/recoil/word-selector-manager";

interface SelectorManagers {
  wordSelectorManager: WordSelectorManager;
}

export const Context = createContext({} as SelectorManagers);

const DependencyInjector: React.FC = ({children}) => {
  const axiosInstance = axios.create({ baseURL: 'https://api.datamuse.com/' });
  const wordRemoteDatasource = new WordRemoteDatasourceImpl(axiosInstance);
  const wordRepository = new WordRepositoryImpl(wordRemoteDatasource);
  const wordSelectorManager = new WordSelectorManager(wordRepository, inputState);

  return <Context.Provider value={{wordSelectorManager}}>
    {children}
  </Context.Provider>;
}

export default DependencyInjector;