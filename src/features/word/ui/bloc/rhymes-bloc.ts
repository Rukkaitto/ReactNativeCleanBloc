import { Bloc } from "@felangel/bloc";
import WordRepository from "../../domain/repositories/repository";
import { GetRhymesEvent, RhymesEvent } from "./rhymes-event";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "./rhymes-state";


export default class RhymesBloc extends Bloc<RhymesEvent, RhymesState> {
  repository: WordRepository;

  constructor(repository: WordRepository) {
    super(new RhymesInitial());
    this.repository = repository;
  }

  async *mapEventToState(event: RhymesEvent) {
    switch (event.constructor) {
      case GetRhymesEvent:
        yield new RhymesLoading();
        try {
          const result = await this.repository.getRhymes((event as GetRhymesEvent).word);
          yield new RhymesLoaded(result);
        } catch (error) {
          yield new RhymesError((error as Error).message);
        }
        break;
    }
  }
}