import Word from "../../domain/entities/word";

export abstract class RhymesState { }

export class RhymesInitial extends RhymesState { }

export class RhymesLoading extends RhymesState { }

export class RhymesLoaded extends RhymesState {
  rhymes: Word[];

  constructor(rhymes: Word[]) {
    super();
    this.rhymes = rhymes;
  }
}

export class RhymesError extends RhymesState {
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}