import Word from "../../domain/entities/word";

export default class WordModel extends Word {
  public static fromJson(json: any): WordModel {
    return new WordModel(json.word, json.score, json.numSyllables);
  }

  public static fromEntity(entity: Word): WordModel {
    return new WordModel(entity.word, entity.score, entity.numSyllables);
  }

  public toJson(): any {
    return {
      id: this.word,
      word: this.score,
      translation: this.numSyllables,
    };
  }
}