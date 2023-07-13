import { MultiSelect } from "@mantine/core";
import { ActorContext } from "../../ActorContext";
import { useContext } from "react";
import type { Option } from "../../ActorContext";

interface Actor {
  id: string;
  name: string;
  profile_path: string;
}

interface ActorSelectProps {
  actors: Option[];
}

function ActorSelect({ actors }: ActorSelectProps) {
  const { selectedActors, setSelectedActors } = useContext(ActorContext);

  const handleOnChange = (values: number[]) => {
    const selected = actors.filter((actor) => values.includes(actor.value));
    setSelectedActors(selected);
  };

  return (
    <MultiSelect
      data={actors}
      value={selectedActors.map((actor) => actor.value)}
      onChange={handleOnChange}
      searchable
      clearable
      limit={200}
      nothingFound="No actors found 😔"
      maxDropdownHeight={160}
      maxSelectedValues={6}
    />
  );
}

export { ActorSelect };
