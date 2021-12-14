import { createContext } from "react";
import { container } from "tsyringe";
import RhymesBloc from "../bloc/rhymes.bloc";

export const rhymesBloc = container.resolve(RhymesBloc);
export const RhymesBlocContext = createContext(rhymesBloc);