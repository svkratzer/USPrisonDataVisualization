import {
  scaleCircleRadii,
  formatClassName,
  addEthnicityTooltips,
} from './script_utils';

const createVisualization = () => {
  const h = 600;
  const w = 1000;

  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "ethnicity-weighted-all")

  const ethnicityData = [
    { ethnicity: "Total Population", numIncarcerated: 431, x: 100, y: 200 },
    { ethnicity: "All Females", numIncarcerated: 63, x: 200, y: 100 },
    { ethnicity: "All Males", numIncarcerated: 810, x: 300, y: 50 },
    { ethnicity: "White Females", numIncarcerated: 49, x: 300, y: 200 },
    { ethnicity: "Hispanic Females", numIncarcerated: 65, x: 50, y: 50 },
    { ethnicity: "Black Females", numIncarcerated: 88, x: 200, y: 15 },
    { ethnicity: "Other Females", numIncarcerated: 113, x: 15, y: 300 },
    { ethnicity: "White Males", numIncarcerated: 392, x: 250, y: 100 },
    { ethnicity: "Hispanic Males", numIncarcerated: 1018, x: 250, y: 50 },
    { ethnicity: "Other Males", numIncarcerated: 1215, x: 50, y: 150 },
    { ethnicity: "Black Males", numIncarcerated: 2272, x: 350, y: 100 }
  ]
  
  const collisionForce = d3.forceCollide(12).strength(1).iterations(100);
  const attractForce = d3.forceManyBody().strength(80).distanceMax(400).distanceMin(80);
  
  const simulation = d3.forceSimulation(ethnicityData)
    .alphaDecay(0.01)
    .force("collisionForce", collisionForce)
    .force("attractForce", attractForce)


  const circles = svg.selectAll("circle")
    .data(ethnicityData)
    .enter()
      .append("circle")
      .attr("cx", (d) => { return parseInt(d.x); })
      .attr("cy", (d) => { return parseInt(d.y); })
      .attr("id", (d) => {
        return `${formatClassName(d.ethnicity)}-bubble`;
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
  
  scaleCircleRadii(circles, 1)
  addEthnicityTooltips(circles);
  
  const dragstarted = (d) => {
    simulation.restart();
    simulation.alpha(0.7);
    debugger;
    d.fx = d.x;
    d.fy = d.y;
  }

  const dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  const dragended = (d) => {
    d.fx = null;
    d.fy = null;
    simulation.alphaTarget(0.1);
  }

  const ticked = () => {
    circles.attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; })
  }

  simulation.on("tick", ticked);

};

// export const createAllWeightedBubbleChart = () => {
//   d3.csv("../../data/raceAllWeighted.csv", (d) => {
//     return {
//       ethnicity: d.ethnicity,
//       numPer100k: +d.numIncarcerated
//     };
//   }, (row) => {
//     ethnicityData.push(row);
//     debugger;
//   }).then(createVisualization);
// };
export const createAllWeightedBubbleChart = () => {
  createVisualization();
};