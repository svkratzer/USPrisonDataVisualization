export const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")

export const spaceCirclesEvenly = (circles, scale) => {
  let baseRadius = 0;
  let cumulativeMargin = 0;
  const lexicalCircles = circles;

  circles.attr("cx", (d, i) => {
      let extraMargin = 0
      let ratio = 1;
      if (i === 0) { 
        baseRadius = Math.pow(parseInt(d.numIncarcerated), 0.5); 
      } else {
        const prevRadius = parseInt(lexicalCircles._groups[0][i - 1].attributes.r.value);
        extraMargin = cumulativeMargin + prevRadius
        ratio = Math.pow(parseInt(d.numIncarcerated), 0.5) / baseRadius;
      }
      cumulativeMargin = ((25 * scale * ratio) + (extraMargin) + 25);
      return (25 * scale * ratio) + (extraMargin) + 25;
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
  selection.on("mouseover", (d) => {
    return tooltip
      .style("visibility", "visible")
      .text(createTooltipText(d.ethnicity, d.numIncarcerated));
  })
  .on("mousemove", (d) => {
    return tooltip
      .style("top", (d3.event.pageY - 20) + "px")
      .style("left", (d3.event.pageX + 20) + "px")
      .text(createTooltipText(d.ethnicity, d.numIncarcerated));
  })
  .on("mouseout", (d) => {
    return tooltip
      .style("visibility", "hidden");
  });
};

const createTooltipText = (ethnicity, numIncarcerated) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return `${ethnicity}: ${numberWithCommas(numIncarcerated)} per 100,000`
}

export const linkTableCellsToBubbles = (selection) => {
  selection.on("mouseover", (d) => {
    let cellId = `#${formatIdName(d.ethnicity)}-cell`
    d3.select(cellId).attr("class", "active-cell")
  })
    .on("mouseout", (d) => {
      let cellId = `#${formatIdName(d.ethnicity)}-cell`
      d3.select(cellId).attr("class", "inactive-cell")
    });
}

export const formatIdName = (name) => {
  const downcased = name.toLowerCase();
  const arr = downcased.split(" ");
  return arr.join("-");
}

export const formatClassName = (name) => {
  const downcased = name.toLowerCase();
  const arr = downcased.split(" ");
  return arr[0];
}

export const scaleCircleRadii = (circles, scale) => {
  let baseRadius = 0;
  circles
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