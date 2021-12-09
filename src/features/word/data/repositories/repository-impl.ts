import { inject, injectable } from "tsyringe";
import Word from "../../domain/entities/word";
import WordRepository from "../../domain/repositories/repository";
import WordRemoteDatasource from "../datasources/remote-datasource";

@injectable()
export class WordRepositoryImpl implements WordRepository {
  constructor(@inject('WordRemoteDatasource') private remoteDatasource: WordRemoteDatasource) { }

  getRhymes(word: string): Promise<Word[]> {
    return this.remoteDatasource.getRhymes(word);
  }
}