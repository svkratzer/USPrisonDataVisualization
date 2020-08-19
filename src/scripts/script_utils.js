export const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")

export const spaceCirclesEvenly = (circles, scale) => {
  circles
    .attr("cx", (d, i) => {
      let extraMargin = 0
      if (i !== 0) {
        const cumulativeMargin = parseInt(circles._groups[0][i - 1].attributes.cx.value);
        const prevRadius = parseInt(circles._groups[0][i - 1].attributes.r.value);
        extraMargin = cumulativeMargin + prevRadius
      }
      return (Math.pow(parseInt(d.numIncarcerated), 0.5) * scale) + (extraMargin) + 25;
    });
}

export const colorCodeCircles = (circles) => {
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

export const addEthnicityTooltips = (selection) => {
  selection.on("mouseover", function (d) {
    return tooltip
      .style("visibility", "visible")
      .text(d.ethnicity + ": " + d.numIncarcerated);
  })
  .on("mousemove", function (d) {
    return tooltip
      .style("top", (d3.event.pageY - 10) + "px")
      .style("left", (d3.event.pageX + 10) + "px")
      .text(d.ethnicity + ": " + d.numIncarcerated);
  })
  .on("mouseout", function (d) {
    return tooltip
      .style("visibility", "hidden");
  });
};

export const formatClassName = (name) => {
  const downcased = name.toLowerCase();
  const arr = downcased.split(" ");
  return arr.join("-")
}

export const scaleCircleRadii = (circles, scale) => {
  let baseRadius = 0;
  circles
    // .transition()
    // .duration(1000)
    .attr("r", (d, i) => {
      if (i === 0) {
        baseRadius = Math.pow(parseInt(d.numIncarcerated), 0.5);
        return 25 * scale;
      } else {
        let ratio = Math.pow(parseInt(d.numIncarcerated), 0.5) / baseRadius;
        return 25 * ratio * scale;
      }
    });
};