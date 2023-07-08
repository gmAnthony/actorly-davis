import { useDisclosure } from "@mantine/hooks";
import { InfoButton } from "./InfoButton/InfoButton";
import { InfoModal } from "./InfoModal/InfoModal";

function InfoContainer() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <InfoButton action={open} />
      <InfoModal opened={opened} onClose={close} />
    </>
  );
}

export { InfoContainer };
