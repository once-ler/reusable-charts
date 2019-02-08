/* @flow */

export const vanish = showreel => () => {
  const t = showreel.svg.selectAll(".symbol")
    .transition()
    .duration(400);

  //lines
  t.select(".rl.line")
    .style("opacity", 1e-6)
    .remove();

  //horizons, areas, stackedArea, overlappingArea
  t.selectAll(".pl.area")
    .style("fill-opacity", 1e-6)
    .remove();

  //remove bars
  t.selectAll("rect")
    .attr("y", showreel.height)
    .attr("height", 0)
    .remove();

  //circles
  t.selectAll("circle")
    .attr("transform", function(d) {
      return "translate(" + (showreel.width - showreel.margin.right) + "," + (-(showreel.gHeight)) + ")";
    })
    .remove();

  //horizon
  showreel.svg.select("defs")
    .remove();

  t.each("end", function() {
    d3.select(this)
      .attr("clip-path", null);
  });
}

export default vanish
