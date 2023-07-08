import { Button as MantineButton } from "@mantine/core";
import { ActorContext } from "../../ActorContext";
import { useContext } from "react";
import { useFetchFilmographies } from "../../hooks/useFetchFilmographies";

function Button() {
  const { selectedActors } = useContext(ActorContext);
  const { fetchFilmographies, error, loading } =
    useFetchFilmographies(selectedActors);

  const handleClick = async () => {
    await fetchFilmographies();
  };

  return (
    <>
      <MantineButton color="dark" onClick={handleClick} loading={loading}>
        <span className="animate-character">ACTORIZE</span>
      </MantineButton>
      {error && (
        <p>
          Hmm, something didn't work. Maybe try again. If it still doesn't work
          let me know:{" "}
          <a href="mailto: gm.anthony@gmail.com">gm.anthony@gmail.com</a>
        </p>
      )}
    </>
  );
}

export { Button };
