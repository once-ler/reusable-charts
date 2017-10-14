export const stackedBar = showreel => () => {
  $.showreel.x = d3.scale.ordinal()
    .domain($.showreel.data[0].values.map(d => d.date))
    .rangeBands([0, $.showreel.width - $.showreel.margin.right], .1);

  const x1 = d3.scale.ordinal()
    .domain($.showreel.data.map(d => d.key))
    .rangeBands([0, $.showreel.x.rangeBand()]);

  //stolen from overlapped area
  $.showreel.y
    .domain([0, d3.max($.showreel.data.map(d => d.maxPrice))])
    .range([$.showreel.height, 0]);

  const g = $.showreel.svg.selectAll(".symbol");

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
      .style("fill-opacity", 0.7)
      .transition()
      .duration(400)
      .attr("y", d => $.showreel.y(d.price))
      .attr("height", d => $.showreel.height - $.showreel.y(d.price));

    rect.exit()
      .remove();
  });

  $.showreel.x.rangeRoundBands([0, $.showreel.width - $.showreel.margin.right], .1);

  const stack = d3.layout.stack()
    .values(d => d.values)
    .x(d => d.date)
    .y(d => d.price)
    .out((d, y0, y) => {
      d.price0 = y0;
    })
    .order("reverse");

  stack($.showreel.data);

  $.showreel.y
    .domain([0, d3.max($.showreel.data[0].values.map(d => d.price + d.price0))])
    .range([$.showreel.height, 0]);

  const t = g.transition()
    .duration(400);

  t.selectAll("rect")
    .delay((d, i) => i * 30)
    .attr("y", d => $.showreel.y(d.price0 + d.price))
    .attr("height", d => $.showreel.height - $.showreel.y(d.price))
    .each("end", function() {
      d3.select(this)
        .style("stroke", "#999")
        .style("stroke-opacity", 1e-6)
        .transition()
        .duration($.showreel.duration / 2)
        .attr("x", d => $.showreel.x(d.date))
        .attr("width", $.showreel.x.rangeBand())
        .style("stroke-opacity", 1);
    });
};
