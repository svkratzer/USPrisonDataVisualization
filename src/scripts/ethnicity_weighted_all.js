import {
  scale,
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
    
    // .attr("r", (d) => {
    //   return Math.pow(parseInt(d.numIncarcerated), 0.5) * scale;
    // })

  let baseRadius = 0;
  circles.attr("r", (d, i) => {
    if(i === 0) {
      baseRadius = Math.pow(parseInt(d.numIncarcerated), 0.5);
      return 25;
    } else {
      let scale = Math.pow(parseInt(d.numIncarcerated), 0.5) / baseRadius;
      return 25 * scale;
    }
  });

  spaceCirclesEvenly(circles);
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