import axios from "axios";
import { BlocObserver, BlocReact } from "bloc-react";
import { WordRemoteDatasourceImpl } from "./features/word/data/datasources/remote-datasource";
import WordRepositoryImpl from "./features/word/data/repositories/repository-impl";
import RhymesCubit from "./features/word/ui/cubits/rhymes-cubit";

const axiosInstance = axios.create({ baseURL: 'https://api.datamuse.com/' });
const wordRemoteDatasource = new WordRemoteDatasourceImpl(axiosInstance);
const wordRepository = new WordRepositoryImpl(wordRemoteDatasource);
const rhymesCubit = new RhymesCubit(wordRepository);

const state = new BlocReact([rhymesCubit]);

state.observer = new BlocObserver({
  onChange: (bloc, event) => console.log({ bloc, event }),
});

export const { useBloc } = state;