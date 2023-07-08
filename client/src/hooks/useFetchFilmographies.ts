import { useState, useContext } from "react";
import type { Option } from "../ActorContext";
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

const useFetchFilmographies = (selectedActors: Option[]) => {
  const { filmographies, setFilmographies } = useContext(ActorContext);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchFilmography = async (actorId: number) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await response.json();
    const tvData = await tvResponse.json();
    const movieFilmography = data.cast.map((movie: Movie) => ({
      work: {
        id: movie.id,
        title: movie.title,
        character: movie.character,
      },
    }));
    const tvFilmography = tvData.cast.map((show: Show) => ({
      work: {
        id: show.id,
        title: show.name,
        character: show.character,
      },
    }));
    const works = [...movieFilmography, ...tvFilmography];
    const actorImage = selectedActors.find(
      (actor) => actor.id === actorId
    )?.image;
    const actorName = selectedActors.find(
      (actor) => actor.id === actorId
    )?.label;
    return {
      actorId: actorId,
      actorName: actorName,
      actorImage: actorImage,
      works: works,
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
