export default class Word {
  word: string;
  score: number;
  numSyllables: number;

  constructor(word: string, score: number, numSyllables: number) {
    this.word = word;
    this.score = score;
    this.numSyllables = numSyllables;
  }
}