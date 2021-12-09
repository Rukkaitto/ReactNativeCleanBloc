import { Bloc } from "@felangel/bloc";
import { Service } from "typedi";
import { WordRepositoryImpl } from "../../data/repositories/repository-impl";
import { GetRhymesEvent, RhymesEvent } from "./rhymes-event";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "./rhymes-state";

@Service()
export default class RhymesBloc extends Bloc<RhymesEvent, RhymesState> {
  constructor(private repository: WordRepositoryImpl) {
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