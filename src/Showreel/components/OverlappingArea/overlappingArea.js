export const overlappingArea = showreel => () => {
  //reset
  $.showreel.x = d3.time.scale()
    .range([0, $.showreel.width - $.showreel.margin.right]);
  $.showreel.y = d3.scale.linear()
    .range([$.showreel.gHeight, 0]);
  $.showreel.x.domain([
    d3.min($.showreel.data, d => d.values[0].date),
    d3.max($.showreel.data, d => d.values[d.values.length - 1].date)
  ]);

  // draw areas really fast
  // need to redefine area:
  $.showreel.area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y0($.showreel.gHeight)
    .y1(function(d) {
      return this.y(d.price);
    });

  const g = $.showreel.svg.selectAll(".symbol");

  g.each(function(d) {
    $.showreel.y.domain([0, d.maxPrice]);

    d3.select(this)
      .selectAll(".pl.area")
      .data(d3.range(1))
      .enter()
      .insert("path", ".line")
      .attr("class", "pl area")
      .attr("transform", d => `translate(0,${d * $.showreel.gHeight})`)
      .attr("d", e => $.showreel.area(_.map(d.values, f => ({
      date: f.date,
      price: 0
    }))))
      .style("fill", $.showreel.sameColor(d.key))
      .style("fill-opacity", 1);

    d3.select(this)
      .selectAll(".pl.area")
      .transition()
      .duration(400)
      .ease("linear")
      .attr("d", $.showreel.area(d.values));
  });

  $.showreel.line
    .y(d => $.showreel.y(d.price0 + d.price));

  g.select(".rl.line")
    .attr("d", d => $.showreel.line(d.values));

  $.showreel.y
    .domain([0, d3.max($.showreel.data.map(d => d.maxPrice))])
    .range([$.showreel.height, 0]);

  $.showreel.area
    .y0($.showreel.height)
    .y1(d => $.showreel.y(d.price));

  $.showreel.line
    .y(d => $.showreel.y(d.price));

  const t = g.transition()
    .duration($.showreel.duration);

  t.select(".rl.line")
    .style("stroke-opacity", 1)
    .attr("d", d => $.showreel.line(d.values));

  t.select(".pl.area")
    .style("fill-opacity", .5)
    .attr("d", d => $.showreel.area(d.values));

  $.showreel.svg.append("line")
    .attr("class", "pl line")
    .attr("x1", 0)
    .attr("x2", $.showreel.width - $.showreel.margin.right)
    .attr("y1", $.showreel.height)
    .attr("y2", $.showreel.height)
    .style("stroke-opacity", 1e-6)
    .transition()
    .duration($.showreel.duration)
    .style("stroke-opacity", 1);
};
