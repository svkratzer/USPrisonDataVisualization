import {
  scaleCircleRadii,
  spaceCirclesEvenly,
  formatClassName,
  addEthnicityTooltips
} from './script_utils';

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
    .attr("cy", (h / 2))
    .attr("id", (d) => {
      return `${formatClassName(d.ethnicity)}-bubble`;
    });

  scaleCircleRadii(circles, 1)
  spaceCirclesEvenly(circles, 1);
  addEthnicityTooltips(circles);
};

export const createAllWeightedBubbleChart = () => {
  d3.csv("../../data/raceAllWeighted.csv", (d) => {
    return {
      ethnicity: d.ethnicity,
      numPer100k: +d.numIncarcerated
    };
  }, (row) => {
    ethnicityData.push(row);
  }).then(createVisualization);
};