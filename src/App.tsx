import "./App.css";
import { ActorSelect } from "./components/ActorSelect/ActorSelect";
import { Button } from "./components/Button/Button";
import { InfoContainer } from "./components/Info/InfoContainer";
import { NetworkGraph } from "./components/NetworkGraph/NetworkGraph";
import { ActorContext } from "./ActorContext";
import { useState, useEffect } from "react";
import type { Option, Filmography } from "./ActorContext";
import jsonData from "../actors.json";

export interface Actor {
  id: string;
  name: string;
  profile_path: string;
}

function App() {
  const [selectedActors, setSelectedActors] = useState<Option[]>([]);
  const [filmographies, setFilmographies] = useState<Filmography[]>([]);
  const [actors, setActors] = useState<Option[]>([]);
  const [filmographiesFetched, setFilmographiesFetched] =
    useState<boolean>(false);

  useEffect(() => {
    const actorOptions = jsonData.map((row) => ({
      value: row.id.toString(),
      label: row.name,
      id: row.id,
      image: `http://image.tmdb.org/t/p/w500${row.profile_path}`,
    }));

    setActors(actorOptions);
  }, []);

  return (
    <ActorContext.Provider
      value={{
        selectedActors,
        setSelectedActors,
        filmographies,
        setFilmographies,
        filmographiesFetched,
        setFilmographiesFetched,
      }}
    >
      <InfoContainer />
      <div className="App">
        <h1>Actorly Davis</h1>
        <span>
          Have you ever wondered what movies or shows certain actors have in
          common? Now you can know!
        </span>
        <div className="search-and-button">
          <div className="actor-select-container">
            <p>Select actors (maximum of 6)</p>
            <ActorSelect actors={actors} />
          </div>
          <div>
            <p>and then</p>
            <Button />
          </div>
        </div>
        {filmographies && <NetworkGraph data={filmographies} />}
      </div>
    </ActorContext.Provider>
  );
}

export default App;
