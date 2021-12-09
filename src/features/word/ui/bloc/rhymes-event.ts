export abstract class RhymesEvent { }

export class GetRhymesEvent extends RhymesEvent {
  word: string;

  constructor(word: string) {
    super();
    this.word = word;
  }
}
