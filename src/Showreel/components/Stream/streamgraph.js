export const streamgraph = showreel => () => {
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
      .style("fill-opacity", 0.8);

    d3.select(this)
      .selectAll(".pl.area")
      .transition()
      .duration(400)
      .ease("linear")
      .attr("d", $.showreel.area(d.values));
  });

  //start
  const stack = d3.layout.stack()
    .values(d => d.values)
    .x(d => d.date)
    .y(d => d.price)
    .out((d, y0, y) => {
      d.price0 = y0;
    })
    .order("reverse")
    .offset("wiggle");

  stack($.showreel.data);

  $.showreel.line
    .y(d => $.showreel.y(d.price0));

  // reset y and area (from stacked area)
  $.showreel.y
    .domain([0, d3.max($.showreel.data[0].values.map(d => d.price + d.price0))])
    .range([$.showreel.height, 0]);

  $.showreel.area
    .y0(d => $.showreel.y(d.price0))
    .y1(d => $.showreel.y(d.price0 + d.price));

  const t = $.showreel.svg.selectAll(".symbol")
    .transition()
    .duration($.showreel.duration);

  t.select("path.pl.area")
    .attr("d", d => $.showreel.area(d.values));

  t.select("path.rl.line")
    .style("stroke-opacity", 1e-6)
    .attr("d", d => $.showreel.line(d.values));
};
