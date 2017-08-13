export const lines = showreel => () => {
  const t = $.showreel.svg.selectAll(".symbol")
    .transition()
    .duration(10);

  //need to reset
  $.showreel.x = d3.time.scale()
    .range([0, $.showreel.width - $.showreel.margin.right]);
  
  $.showreel.y = d3.scale.linear()
    .range([$.showreel.gHeight, 0]);
  
  $.showreel.x.domain([
    d3.min($.showreel.data, d => d.values[0].date),
    d3.max($.showreel.data, d => d.values[d.values.length - 1].date)
  ]);
  
  $.showreel.line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y(function(d) {
      return this.y(d.price);
    });

  const g = $.showreel.svg.selectAll(".symbol");

  g.each(function(d) {
    $.showreel.y.domain([0, d.maxPrice]);

    d3.select(this)
      .selectAll(".rl.line")
      .data(d3.range(1))
      .enter()
      .append("path", ".line")
      .attr("class", "rl line")
      .attr("transform", d => `translate(0,${d * $.showreel.gHeight})`)
      .attr("d", e => $.showreel.line(_.map(d.values, f => ({
      date: f.date,
      price: 0
    }))))
      .style("fill", "none")
      .style("stroke-width", "1.5px")
      .style("stroke", $.showreel.darkerColor(d.key))
      .style("stroke-opacity", 1);

    d3.select(this)
      .selectAll(".rl.line")
      .transition()
      .duration($.showreel.duration / 2)
      .ease("linear")
      .attr("d", $.showreel.line(d.values));
  });
};
