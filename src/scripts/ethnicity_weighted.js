let ethnicityData = [];
const scale = 1;

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
};

const spaceCirclesEvenly = (circles) => {
  circles.attr("cx", (d, i) => {
    let extraMargin = 0
    if (i !== 0) {
      const cumulativeMargin = parseInt(circles._groups[0][i - 1].attributes.cx.value);
      const prevRadius = parseInt(circles._groups[0][i - 1].attributes.r.value);
      extraMargin = cumulativeMargin + prevRadius
    }
    return (Math.pow(parseInt(d.numIncarcerated), 0.5) * scale) + (extraMargin) + 25;
  });
}

const colorCodeCircles = (circles) =>  {
  const baseValue = parseInt(circles._groups[0][0].__data__.numIncarcerated);
  circles.attr("class", (d, i) => {
    const diff = (parseInt(d.numIncarcerated) / baseValue);
    if (diff >= 2) {
      return "high-positive";
    } else if (diff >= 1.5 && diff < 2) {
      return "med-positive";
    } else if (diff > 1 && diff < 1.5) {
      return "low-positive";
    } else if (diff >= .75 && diff < 1) {
      return "low-negative";
    } else if (diff >= .5 && diff < .75) {
      return "med-negative";
    } else if (diff < .5) {
      return "high-negative";
    }
  });
};

const formatClassName = (name) => {
  const downcased = name.toLowerCase();
  const arr = downcased.split(" ");
  return arr.join("-")
}

d3.csv("../../data/raceMaleWeighted.csv", (d) => {
  return {
    ethnicity: d.ethnicity,
    numPer100k: +d.numIncarcerated
  };
}, (row) => {
  ethnicityData.push(row);
}).then(createVisualization);