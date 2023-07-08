import { ActionIcon, Affix } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

interface InfoButtonProps {
  action: () => void;
}

function InfoButton({ action }: InfoButtonProps) {
  return (
    <Affix position={{ top: 20, right: 100 }} zIndex={200}>
      <ActionIcon
        className="info-button"
        onClick={action}
        variant="outline"
        color="dark"
        radius="xl"
      >
        <IconInfoCircle />
      </ActionIcon>
    </Affix>
  );
}

export { InfoButton };
