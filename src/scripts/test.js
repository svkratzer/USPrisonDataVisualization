const data = [10, 25, 40, 50];
const h = 200;
const w = 500;
const svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

const circles = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cy", 100)
  .attr("r", (d) => { return d; })
  .attr("fill", "coral");

circles.attr("cx", (d, i) => {
  let extraMargin = 0
  if (i !== 0) {
    const cumMargin = parseInt(circles._groups[0][i - 1].attributes.cx.value);
    const prevRadius = circles._groups[0][i - 1].__data__
    extraMargin = cumMargin + prevRadius
  }
  return d + (extraMargin) + 25;
});