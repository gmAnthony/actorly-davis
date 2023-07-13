import { Modal, Avatar, Badge } from "@mantine/core";
import myAvatar from "../../../assets/myAvatar.jpg";
function InfoModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      // title="Hey! 👋"
      withCloseButton={false}
      centered
      size="lg"
      overlayProps={{
        color: "#2b2b2b",
        opacity: 0.55,
        blur: 3,
      }}
      yOffset="1vh"
      xOffset="1vw"
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>👋</span>
          <h2>Hey! My name is Anthony Miller</h2>
          <Avatar src={myAvatar} alt="Me, Anthony Miller" radius="xl" />
          <span>👋</span>
        </div>
        <p>
          I'm the software engineer that created this fine website. A few years
          ago my wife told me she had a million dollar idea for a website and,
          while maybe not capable of generating a million dollars, this website
          was her great idea. My hope is that if you don't find it useful you at
          least find it amusing. I built this site using React, TypeScript, and
          Mantine.
        </p>
        <p>Here are my development plans for this site:</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Badge color="blue">Current</Badge> Fix some wonkiness with the
            network chart
          </li>
          <li>
            <Badge color="yellow">Planned</Badge> Make the site mobile-friendly
          </li>
          <li>
            <Badge color="yellow">Planned</Badge> Add an alternate view which
            just lists the shared movies/films
          </li>
          <li>
            <Badge color="yellow">Planned</Badge> Add the ability to only show
            movies or shows instead of both
          </li>
        </ul>
        <p>
          Check out more of my work at{" "}
          <a href="https://alphawaffle.com">alphawaffle</a>.
        </p>
      </div>
    </Modal>
  );
}

export { InfoModal };
