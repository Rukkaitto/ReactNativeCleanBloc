import Word from "../../domain/entities/word";

export default class WordModel extends Word {
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