import { createContext, Dispatch, SetStateAction } from "react";

export interface Option {
  value: string;
  label: string;
  id: number;
  image: string;
}

export interface Work {
  work: {
    id: number;
    title: string;
    character: string;
  };
}

export interface Filmography {
  actorId: number;
  actorName?: string;
  actorImage?: string;
  works: Work[];
}

export const ActorContext = createContext({
  selectedActors: [] as Option[],
  setSelectedActors: (() => {}) as Dispatch<SetStateAction<Option[]>>,
  filmographies: [] as Filmography[],
  setFilmographies: (() => {}) as Dispatch<SetStateAction<Filmography[]>>,
});
