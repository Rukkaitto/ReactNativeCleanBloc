import { Cubit } from "bloc-react";
import WordRepository from "../../domain/repositories/repository";
import { RhymesError, RhymesInitial, RhymesLoaded, RhymesLoading, RhymesState } from "./rhymes-state";

export default class RhymesCubit extends Cubit<RhymesState> {
  repository: WordRepository;

  constructor(repository: WordRepository) {
    super(new RhymesInitial());
    this.repository = repository;
  }

  async getRhymes(word: string) {
    this.emit(new RhymesLoading());
    try {
      const rhymes = await this.repository.getRhymes(word);
      this.emit(new RhymesLoaded(rhymes));
    } catch (e) {
      this.emit(new RhymesError("Error loading rhymes"));
    }
  }
}