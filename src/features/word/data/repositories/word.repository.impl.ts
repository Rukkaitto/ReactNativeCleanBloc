import { inject, singleton } from "tsyringe";
import Word from "../../domain/entities/word";
import WordRepository from "../../domain/repositories/word.repository";
import WordRemoteDatasource from "../datasources/word.remote.datasource";

@singleton()
export class WordRepositoryImpl implements WordRepository {
  constructor(@inject('WordRemoteDatasource') private remoteDatasource: WordRemoteDatasource) { }

  getRhymes(word: string): Promise<Word[]> {
    return this.remoteDatasource.getRhymes(word);
  }
}