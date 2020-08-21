import {
  scaleCircleRadii,
  formatClassName,
  formatIdName,
  linkTableCellsToBubbles
} from './script_utils';

export const createAllWeightedBubbleChart = () => {
  const nodeData = [
    { ethnicity: "Total Population", numIncarcerated: 431, x: 100, y: 200, r: 25, opacity: 1 },
    { ethnicity: "All Females", numIncarcerated: 63, x: 200, y: 100, r: 9, opacity: 1 },
    { ethnicity: "All Males", numIncarcerated: 810, x: 300, y: 50, r: 34, opacity: 1 },
    { ethnicity: "Black Females", numIncarcerated: 88, x: 200, y: 15, r: 11, opacity: 1 },
    { ethnicity: "Black Males", numIncarcerated: 2272, x: 350, y: 100, r: 57, opacity: 1 },
    { ethnicity: "White Females", numIncarcerated: 49, x: 300, y: 200, r: 8, opacity: 1 },
    { ethnicity: "White Males", numIncarcerated: 392, x: 250, y: 100, r: 23, opacity: 1 },
    { ethnicity: "Hispanic Females", numIncarcerated: 65, x: 50, y: 50, r: 9, opacity: 1 },
    { ethnicity: "Hispanic Males", numIncarcerated: 1018, x: 250, y: 50, r: 38, opacity: 1 },
    { ethnicity: "Other Females", numIncarcerated: 113, x: 15, y: 300, r: 12, opacity: 1 },
    { ethnicity: "Other Males", numIncarcerated: 1215, x: 50, y: 150, r: 41, opacity: 1 },
  ];


  const width = 1200;
  const height = 600;

  const bubbleFigure = d3.select("body")
    .append("figure")
    .attr("id", "bubble-figure");

  const svg = bubbleFigure
    .append("svg")
    .attr("id", "ethnicity-weighted-all")
    .attr("width", width)
    .attr("height", height);

  svg.append("text")
    .text("Imprisonment Rates of U.S. Residents by Demographic per 100,000")
    .attr("x", 10)
    .attr("y", 30)

  const legend = svg.append("g")
    .attr("class", "legend")

  legend.append("g").attr("id", "total-legend").append("text").text("total population")
  legend.append("g").attr("id", "all-legend").append("text").text("all males / all females")
  legend.append("g").attr("id", "black-legend").append("text").text("black")
  legend.append("g").attr("id", "white-legend").append("text").text("white")
  legend.append("g").attr("id", "hispanic-legend").append("text").text("hispanic")
  legend.append("g").attr("id", "other-legend").append("text").text("other")

  d3.selectAll(".legend g").append("rect")

  d3.selectAll(".legend text")
    .attr("y", (d, i) => { return i * 15 + 510 })
    .attr("x", 30)
  d3.selectAll(".legend rect")
    .attr("y", (d, i) => { return i * 15 + 501 })
    .attr("x", 15)
    .attr("width", 10)
    .attr("height", 10)

  legend.append("ellipse")
    .attr("rx", 37.7)
    .attr("ry", 37.7)
    .attr("cx", 200)
    .attr("cy", 540);
  legend.append("ellipse")
    .attr("rx", 23.8)
    .attr("ry", 23.8)
    .attr("cx", 200)
    .attr("cy", 550);
  legend.append("ellipse")
    .attr("rx", 11.9)
    .attr("ry", 11.9)
    .attr("cx", 200)
    .attr("cy", 555);

  legend.append("text")
    .attr("x", 192)
    .attr("y", 514)
    .text("500")
    .attr("id", "circle-text");
  legend.append("text")
    .attr("x", 192)
    .attr("y", 538)
    .text("200")
    .attr("id", "circle-text");
  legend.append("text")
    .attr("x", 195)
    .attr("y", 558)
    .text("50")
    .attr("id", "circle-text");

  const lineGenerator = d3.line()
    .curve(d3.curveCardinal);

  const points = [
    [230, 175],
    [260, 160],
    [270, 120],
    [300, 110]
  ];

  const pathData = lineGenerator(points);

  svg.append('path')
    .attr('d', pathData)
    .attr('fill', 'none')
  
  svg.append('text').attr("x", 310).attr("y", 107).text("Click and drag a bubble to compare").attr("class", "info-text")
  svg.append('text').attr("x", 310).attr("y", 123).text("it to the population average.").attr("class", "info-text")
  svg.append('text').attr("x", 400).attr("y", 590).text("*This graphic was created using data from the Bureau of Justice Statistics 2018 report on U.S. prisons.").attr("class", "info-text")

  const attractForce = d3.forceManyBody().strength(150).distanceMax(4000).distanceMin(80);
  const collisionForce = d3.forceCollide(12).strength(1).iterations(100).radius((d) => { return (d.r + 25) });
  const centralForce = d3.forceCenter(width / 2, height / 2)

  const simulation = d3.forceSimulation(nodeData)
    .alphaDecay(0.01)
    .force("collisionForce", collisionForce)
    .force('center', centralForce)
    .force("attractForce", attractForce)

  const node = svg
    .selectAll("circle")
    .data(nodeData)
    .enter().append("circle")
    .attr("cx", (d) => { return d.x; })
    .attr("cy", (d) => { return d.y; })
    .style("opacity", (d) => d.opacity)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .attr("id", (d) => {
      return `${formatClassName(d.ethnicity)}-bubble`;
    });

  bubbleFigure.append("table")
    .attr("id", "data-table")

  const cells = d3.select("#data-table")
    .selectAll("div")
    .data(nodeData)
    .enter()
    .append("div")
    .attr("class", "inactive-cell")
    .attr("id", (d) => {
      return `${formatIdName(d.ethnicity)}-cell`
    })
  
  const firstChild = cells.append("div")

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  firstChild.append("div").text((d) => {
    return d.ethnicity;
  })

  firstChild.append("div").text((d) => {
    return `${numberWithCommas(d.numIncarcerated)} per 100,000`;
  })

  cells.append("div").text((d) => {
    return `(Approx. 1 in ${numberWithCommas(Math.floor(100000 / d.numIncarcerated))})`
  })

  scaleCircleRadii(node, 1.4);
  linkTableCellsToBubbles(node);

  function dragstarted(d) {
    simulation.restart();
    simulation.alpha(0.7);
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    d.fx = null;
    d.fy = null;
    simulation.alphaTarget(0.1);
  }

  function ticked() {
    node.attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; })
  }

  simulation.on("tick", ticked);

  svg.append("ellipse")
    .attr("rx", 35)
    .attr("ry", 35)
    .attr("id", "comparison")
    .attr("cx", 200)
    .attr("cy", 200);

  svg.append("text")
    .attr("id", "comparison-text")
    .attr("x", 191)
    .attr("y", 196)
    .text("total")
  svg.append("text")
    .attr("id", "comparison-text")
    .attr("x", 179)
    .attr("y", 208)
    .text("population")

}