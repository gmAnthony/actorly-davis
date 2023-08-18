import { useState, useContext } from "react";
import type { Option, Work } from "../ActorContext";
import { ActorContext } from "../ActorContext";

interface Movie {
  id: number;
  title: string;
  character: string;
}

interface Show {
  id: number;
  name: string;
  character: string;
}

const BASE_URL = "https://api.themoviedb.org/3/person/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const useFetchFilmographies = (selectedActors: Option[]) => {
  const { filmographies, setFilmographies } = useContext(ActorContext);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCredits = async (actorId: number, type: "movie" | "tv") => {
    const response = await fetch(
      `${BASE_URL}${actorId}/${type}_credits?api_key=${API_KEY}`
    );
    return response.json();
  };

  const parseCredits = <T extends "movie" | "tv">(
    data: T extends "movie" ? Movie[] : Show[],
    type: T
  ): Work[] => {
    return data.map((item: Movie | Show) => ({
      id: item.id,
      title: type === "movie" ? (item as Movie).title : (item as Show).name,
      character: item.character,
    }));
  };

  const fetchFilmography = async (actorId: number) => {
    const movieData = await fetchCredits(actorId, "movie");
    const tvData = await fetchCredits(actorId, "tv");
    const movieFilmography = parseCredits(movieData.cast, "movie");
    const tvFilmography = parseCredits(tvData.cast, "tv");
    const actorDetails = selectedActors.find((actor) => actor.id === actorId);

    return {
      actorId: actorId,
      actorName: actorDetails?.label,
      actorImage: actorDetails?.image,
      works: [...movieFilmography, ...tvFilmography],
    };
  };

  const fetchFilmographies = async () => {
    setLoading(true);
    try {
      const fetchedFilmographies = await Promise.all(
        selectedActors.map((actor) => fetchFilmography(actor.id))
      );
      setFilmographies(fetchedFilmographies);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchFilmographies, filmographies, error, loading };
};

export { useFetchFilmographies };
