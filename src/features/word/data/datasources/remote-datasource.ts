import { AxiosInstance } from "axios";
import WordModel from "../models/word-model";

export default interface WordRemoteDatasource {
  getRhymes(word: String): Promise<WordModel[]>;
}

export class WordRemoteDatasourceImpl implements WordRemoteDatasource {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getRhymes(word: String): Promise<WordModel[]> {
    const response = await this.axios.get<WordModel[]>("/words", { params: { "rel_rhy": word } });
    return response.data;
  }
}