import Word from "../entities/word";

export default interface WordRepository {
  getRhymes(word: string): Promise<Word[]>;
}