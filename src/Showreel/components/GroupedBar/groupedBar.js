export const groupedBar = showreel => () => {
  $.showreel.x = d3.scale.ordinal()
    .domain($.showreel.data[0].values.map(d => d.date))
    .rangeBands([0, $.showreel.width - $.showreel.margin.right], .1);

  const x1 = d3.scale.ordinal()
    .domain($.showreel.data.map(d => d.key))
    .rangeBands([0, $.showreel.x.rangeBand()]);

  $.showreel.y
    .domain([0, d3.max($.showreel.data.map(d => d.maxPrice))])
    .range([$.showreel.height, 0]);

  const g = $.showreel.svg.selectAll(".symbol");

  const t = g.transition()
    .duration($.showreel.duration / 2);

  g.each(function(p, j) {
    const rect = d3.select(this)
      .selectAll("rect")
      .data(d => d.values);

    rect.enter()
      .append("rect")
      .attr("x", d => $.showreel.x(d.date) + x1(p.key))
      .attr("width", x1.rangeBand())
      .attr("y", $.showreel.height)
      .attr("height", 0)
      .style("fill", $.showreel.sameColor(p.key))
      .style("fill-opacity", 0.8)
      .transition()
      .duration($.showreel.duration)
      .attr("y", d => $.showreel.y(d.price))
      .attr("height", d => $.showreel.height - $.showreel.y(d.price));

    rect.exit()
      .remove();

  });
};
