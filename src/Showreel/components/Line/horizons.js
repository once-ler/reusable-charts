export const horizons = showreel => () => {
  //need to redefine area:
  $.showreel.area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y0($.showreel.gHeight)
    .y1(function(d) {
      return this.y(d.price);
    });

  //reset
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

  $.showreel.svg.insert("defs", ".symbol")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", $.showreel.width)
    .attr("height", $.showreel.gHeight);

  const g = $.showreel.svg.selectAll(".symbol")
    .attr("clip-path", "url(#clip)");

  g.each(function(d) {

    $.showreel.y.domain([0, d.maxPrice]);

    d3.select(this)
      .selectAll(".pl.area")
      .data(d3.range(3))
      .enter()
      .insert("path", ".line")
      .attr("class", "pl area")
      .attr("transform", d => `translate(0,${d * $.showreel.gHeight})`)
      .attr("d", $.showreel.area(d.values))
      .style("fill", (d, i) => $.showreel.color2(i))
      .style("fill-opacity", 1e-6);

    $.showreel.y.domain([0, d.maxPrice / 3]);

    d3.select(this)
      .selectAll(".pl.area")
      .transition()
      .duration($.showreel.duration)
      .style("fill-opacity", 1)
      .attr("d", $.showreel.area(d.values))
      .each("end", function() {
        d3.select(this)
          .style("fill-opacity", null);
      });

  });
};
