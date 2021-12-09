import { Service } from "typedi";
import Word from "../../domain/entities/word";
import WordRepository from "../../domain/repositories/repository";
import { WordRemoteDatasourceImpl } from "../datasources/remote-datasource";

@Service()
export class WordRepositoryImpl implements WordRepository {
  constructor(private remoteDatasource: WordRemoteDatasourceImpl) { }

  getRhymes(word: string): Promise<Word[]> {
    return this.remoteDatasource.getRhymes(word);
  }
}