import Word from "../../domain/entities/word";

export abstract class RhymesState { }

export class RhymesInitial extends RhymesState { }

export class RhymesLoading extends RhymesState { }

export class RhymesLoaded extends RhymesState {
  constructor(public rhymes: Word[]) {
    super();
  }
}

export class RhymesError extends RhymesState {
  constructor(public message: string) {
    super();
  }
}