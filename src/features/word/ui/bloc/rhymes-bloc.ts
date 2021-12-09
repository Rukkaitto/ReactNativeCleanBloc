import { Bloc } from "@felangel/bloc";
import { inject, injectable } from "tsyringe";
import WordRepository from "../../domain/repositories/repository";
import { GetRhymesEvent, RhymesEvent } from "./rhymes-event";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "./rhymes-state";

@injectable()
export default class RhymesBloc extends Bloc<RhymesEvent, RhymesState> {
  constructor(@inject('WordRepository') private repository: WordRepository) {
    super(new RhymesInitial());
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