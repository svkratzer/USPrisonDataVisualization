const h = 200;
const w = 500;
const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("class", "ethnicity-weighted-bubbles")

let ethnicityData = [];

d3.csv("../../data/raceMaleWeighted.csv", (d) => {
  return {
    ethnicity: d.ethnicity,
    numPer100k: d.numIncarcerated
  };
}, (rows) => {
  ethnicityData = rows;
  debugger
  console.log(ethnicityData);
  // createVisualization();
});