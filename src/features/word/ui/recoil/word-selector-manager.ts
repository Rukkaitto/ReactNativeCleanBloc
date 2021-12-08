import { RecoilState, selector } from "recoil";
import WordRepository from "../../domain/repositories/repository";

export default class WordSelectorManager {
  inputState: RecoilState<string>
  repository: WordRepository;

  constructor(repository: WordRepository, inputState: RecoilState<string>) {
    this.repository = repository;
    this.inputState = inputState;
  }

  rhymesQuery = selector({
    key: 'Rhymes',
    get: async ({ get }) => {
      const rhymes = await this.repository.getRhymes(get(this.inputState));
      return rhymes;
    },
  });
}