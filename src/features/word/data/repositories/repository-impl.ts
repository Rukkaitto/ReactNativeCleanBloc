import Word from "../../domain/entities/word";
import WordRepository from "../../domain/repositories/repository";

export default class WordRepositoryImpl implements WordRepository {
  remoteDatasource: WordRemoteDatasource;

  constructor(remoteDatasource: WordRemoteDatasource) {
    this.remoteDatasource = remoteDatasource;
  }

  getRhymes(word: string): Promise<Word[]> {
    return this.remoteDatasource.getRhymes(word);
  }
}