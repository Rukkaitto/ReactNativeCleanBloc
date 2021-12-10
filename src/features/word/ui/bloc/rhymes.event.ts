export abstract class RhymesEvent { }

export class GetRhymesEvent extends RhymesEvent {
  constructor(public word: string) {
    super();
  }
}
