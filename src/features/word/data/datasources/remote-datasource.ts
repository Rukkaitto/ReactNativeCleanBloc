import axios from "axios";
import { Service } from "typedi";
import WordModel from "../models/word-model";

export default interface WordRemoteDatasource {
  getRhymes(word: String): Promise<WordModel[]>;
}

@Service()
export class WordRemoteDatasourceImpl implements WordRemoteDatasource {
  constructor() { }

  async getRhymes(word: String): Promise<WordModel[]> {
    const axiosInstance = axios.create({ baseURL: 'https://api.datamuse.com/' });
    const response = await axiosInstance.get<WordModel[]>("/words", { params: { "rel_rhy": word } });
    return response.data;
  }
}