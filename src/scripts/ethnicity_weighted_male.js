import { 
  scale, 
  spaceCirclesEvenly, 
  colorCodeCircles,
  formatClassName,
  addEthnicityTooltips } from './script_utils';

let ethnicityData = [];

const createVisualization = () => {
  const h = 120;
  const w = 1000;
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "ethnicity-weighted-bubbles")

  const circles = svg.selectAll("circle")
  .data(ethnicityData)
  .enter()
  .append("circle")
  .attr("cy", (h/2))
  .attr("r", (d) => { 
    return Math.pow(parseInt(d.numIncarcerated), 0.5) * scale; 
  })
  .attr("id", (d) => {
    return `${formatClassName(d.ethnicity)}-bubble`;
  });

  spaceCirclesEvenly(circles);
  colorCodeCircles(circles);
  addEthnicityTooltips(circles);
};

export const createMaleWeightedBubbleChart = () => {
    d3.csv("../../data/raceMaleWeighted.csv", (d) => {
      return {
        ethnicity: d.ethnicity,
        numPer100k: +d.numIncarcerated
      };
    }, (row) => {
      ethnicityData.push(row);
    }).then(createVisualization);
};