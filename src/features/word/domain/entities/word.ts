export default class Word {
  word: String;
  score: Number;
  numSyllables: Number;

  constructor(word: String, score: Number, numSyllables: Number) {
    this.word = word;
    this.score = score;
    this.numSyllables = numSyllables;
  }
}