export const bars = showreel => () => {
  showreel.x = d3.scale.ordinal()
    .domain(showreel.data[0].values.map(d => d.date))
    .rangeBands([0, showreel.width - showreel.margin.right], .1);

  const g = showreel.svg.selectAll(".symbol");

  g.each(function(p, j) {
    const y = d3.scale.linear()
      .domain([0, p.maxPrice])
      .range([showreel.gHeight, 0]);

    const rect = d3.select(this)
      .selectAll("rect")
      .data(d => d.values);

    rect.enter()
      .append("rect")
      .attr("transform", d => {
        return;
        return `translate(0,${d * showreel.gHeight})`;
      })
      .attr("x", d => showreel.x(d.date))
      .attr("width", showreel.x.rangeBand())
      .attr("y", showreel.gHeight)
      .attr("height", 0)
      .style("fill", showreel.sameColor(p.key))
      .style("fill-opacity", 0.6)
      .transition()
      .duration(showreel.duration)
      .attr("y", d => y(d.price))
      .attr("height", d => showreel.gHeight - y(d.price));

    rect.exit()
      .remove();

  });
};

export default bars
