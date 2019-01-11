export const switchXAxis = showreel => (i, j) => {
  d3.selectAll(".x.axis.x" + i + ".axis" + i)
    .transition()
    .duration(400)
    .attr("opacity", 1);

  d3.selectAll(".x.axis.x" + j + ".axis" + j)
    .transition()
    .duration(400)
    .attr("opacity", 0);

  if (i == 0) {
    d3.selectAll(".y.axis.left")
      .transition()
      .duration(400)
      .attr("opacity", 1);
  } else {
    d3.selectAll(".y.axis.left")
      .transition()
      .duration(400)
      .attr("opacity", 0);
  }
};
