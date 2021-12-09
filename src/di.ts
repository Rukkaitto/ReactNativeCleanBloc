import axios from "axios";
import { container } from "tsyringe";
import { WordRemoteDatasourceImpl } from "./features/word/data/datasources/remote-datasource";
import { WordRepositoryImpl } from "./features/word/data/repositories/repository-impl";

container.register('axios', {
  useValue: axios.create({
    baseURL: 'https://api.datamuse.com/',
  }),
});

container.register('WordRepository', {
  useClass: WordRepositoryImpl,
});

container.register('WordRemoteDatasource', {
  useClass: WordRemoteDatasourceImpl,
});