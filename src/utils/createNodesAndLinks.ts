import type { Filmography } from "../ActorContext";

interface SimulationNode extends d3.SimulationNodeDatum {
  id: string | number;
  group: number;
  actorImage?: string | null | undefined;
  actorName?: string;
  color?: string;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode;
  target: SimulationNode;
}

function createNodesAndLinks(data: Filmography[]) {
  let tempNodes: SimulationNode[] = [];
  let tempLinks: SimulationLink[] = [];

  data.forEach((actor) => {
    let actorNode = tempNodes.find(
      (node) => node.id === actor.actorId.toString()
    );
    if (!actorNode) {
      actorNode = {
        id: actor.actorId.toString(),
        group: 2,
        actorName: actor.actorName,
        actorImage: actor.actorImage,
      };
      tempNodes.push(actorNode);
    }

    actor.works.forEach((work) => {
      let workNode = tempNodes.find((node) => node.id === work.work.title);
      if (!workNode) {
        workNode = { id: work.work.title, group: 1 };
        tempNodes.push(workNode);
      }

      const existingLink = tempLinks.find(
        (link) =>
          link.source.id === actorNode?.id && link.target.id === workNode?.id
      );
      if (!existingLink) {
        tempLinks.push({
          source: actorNode as SimulationNode,
          target: workNode,
        });
      }
    });
  });

  let workCounts = new Map<string, number>();
  tempLinks.forEach((link) => {
    const workId = link.target.id.toString();
    if (workCounts.has(workId)) {
      workCounts.set(workId, workCounts.get(workId)! + 1);
    } else {
      workCounts.set(workId, 1);
    }
  });

  let links = tempLinks.filter((link) => {
    return workCounts.get(link.target.id.toString())! > 1;
  });

  let linkNodeIds = new Set<string>();
  links.forEach((link) => {
    linkNodeIds.add(link.source.id.toString());
    linkNodeIds.add(link.target.id.toString());
  });

  let nodes = tempNodes.filter((node) => {
    return linkNodeIds.has(node.id.toString());
  });

  return { nodes, links };
}

export { createNodesAndLinks };
