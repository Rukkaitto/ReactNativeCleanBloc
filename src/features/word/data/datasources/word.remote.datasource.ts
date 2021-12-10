import { AxiosInstance } from "axios";
import { inject, singleton } from "tsyringe";
import WordModel from "../models/word.model";

export default interface WordRemoteDatasource {
  getRhymes(word: String): Promise<WordModel[]>;
}

@singleton()
export class WordRemoteDatasourceImpl implements WordRemoteDatasource {
  constructor(@inject('axios') private axiosInstance: AxiosInstance) { }

  async getRhymes(word: String): Promise<WordModel[]> {
    const response = await this.axiosInstance.get<WordModel[]>("/words", { params: { "rel_rhy": word } });
    return response.data;
  }
}