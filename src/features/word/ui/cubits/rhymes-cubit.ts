import axios from "axios";
import { Cubit } from "bloc-react";
import { WordRemoteDatasourceImpl } from "../../data/datasources/remote-datasource";
import WordRepositoryImpl from "../../data/repositories/repository-impl";
import WordRepository from "../../domain/repositories/repository";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "./rhymes-state";

export default class RhymesCubit extends Cubit<RhymesState> {
  repository: WordRepository;

  constructor() {
    super(new RhymesInitial());
    const axiosInstance = axios.create({ baseURL: 'https://api.datamuse.com/' });
    const wordRemoteDatasource = new WordRemoteDatasourceImpl(axiosInstance);
    const wordRepository = new WordRepositoryImpl(wordRemoteDatasource);
    this.repository = wordRepository
  }

  async getRhymes(word: string) {
    this.emit(new RhymesLoading());
    try {
      const rhymes = await this.repository.getRhymes(word);
      this.emit(new RhymesLoaded(rhymes));
    } catch (e) {
      this.emit(new RhymesError("Error loading rhymes"));
    }
  }
}