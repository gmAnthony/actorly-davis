import { useRef, useEffect } from "react";
import type { Filmography } from "../../ActorContext";
import missingAvatar from "../../assets/missingAvatar.png";
import * as d3 from "d3";
import { createNodesAndLinks } from "../../utils/createNodesAndLinks";

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

interface SimulationNode extends d3.SimulationNodeDatum {
  id: string | number;
  group: number;
  actorImage?: string | null | undefined;
  actorName?: string;
}

interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode;
  target: SimulationNode;
}

interface NetworkGraphProps {
  data: Filmography[];
}

function NetworkGraph({ data }: NetworkGraphProps) {
  const width = 600;
  const height = 600;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && Array.isArray(data)) {
      d3.select(ref.current).select("svg").remove();

      const { nodes, links } = createNodesAndLinks(data);

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      nodes.forEach((node) => {
        if (node.group === 2) node.color = color(node.id.toString());
      });

      let svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      let simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          (
            d3.forceLink(links) as d3.ForceLink<SimulationNode, SimulationLink>
          ).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

      let defs = svg.append("defs");

      let imgPattern = defs
        .selectAll(".img-pattern")
        .data(nodes.filter((node) => node.group === 2))
        .enter()
        .append("pattern")
        .attr("class", "img-pattern")
        .attr("id", (node) => `image-${node.id}`)
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", (node) => node.actorImage || missingAvatar);

      let link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", 1)
        .attr("stroke", (d) => d.source.color || "black");

      const tooltip = d3.select("#tooltip");
      let timeoutId: number;

      let node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", function (d) {
          return d.group === 1 ? 5 : 30;
        })
        .attr("fill", function (d) {
          return d.group === 1 ? "black" : `url(#image-${d.id})`;
        })
        .style("stroke", function (d) {
          return d.color || "black";
        })
        .style("stroke-width", function (d) {
          return d.group === 1 ? "0px" : "3px";
        })
        .call(
          d3
            .drag<SVGCircleElement, SimulationNode>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .on("mouseover", function (event, d) {
          timeoutId = setTimeout(function () {
            tooltip
              .style("visibility", "visible")
              .text(
                d.group === 2
                  ? d.actorName || "Unknown Actor"
                  : d.id || "Unknown Movie/Show"
              );
          }, 50); // Delay in milliseconds
        })
        .on("mousemove", function (event, d) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function (event, d) {
          clearTimeout(timeoutId);
          tooltip.style("visibility", "hidden");
        });

      simulation.nodes(nodes).on("tick", ticked);
      let linkForce = simulation.force("link");
      if (linkForce && "links" in linkForce) {
        (linkForce as d3.ForceLink<SimulationNode, SimulationLink>).links(
          links
        );
      }

      function ticked() {
        link
          .attr("x1", function (d) {
            return d.source.x ?? 0;
          })
          .attr("y1", function (d) {
            return d.source.y ?? 0;
          })
          .attr("x2", function (d) {
            return d.target.x ?? 0;
          })
          .attr("y2", function (d) {
            return d.target.y ?? 0;
          });

        node
          .attr("cx", function (d) {
            return (d.x = Math.max(30, Math.min(width - 30, d.x!)));
          })
          .attr("cy", function (d) {
            return (d.y = Math.max(30, Math.min(height - 30, d.y!)));
          });
      }
    }
  }, [ref, data]);

  return (
    <>
      <div ref={ref} />
      <div
        id="tooltip"
        style={{
          position: "absolute",
          visibility: "hidden",
          background: "white",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "12px",
        }}
      ></div>
    </>
  );
}

export { NetworkGraph };
