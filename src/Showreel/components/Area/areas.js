export const areas = showreel => () => {
  //reset
  $.showreel.x = d3.time.scale()
    .range([0, $.showreel.width - $.showreel.margin.right]);
  $.showreel.y = d3.scale.linear()
    .range([$.showreel.gHeight, 0]);
  $.showreel.x.domain([
    d3.min($.showreel.data, function(d) {
      return d.values[0].date;
    }),
    d3.max($.showreel.data, function(d) {
      return d.values[d.values.length - 1].date;
    })
  ]);

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

  var g = $.showreel.svg.selectAll(".symbol");

  g.each(function(d) {

    $.showreel.y.domain([0, d.maxPrice]);

    d3.select(this)
      .selectAll(".pl.area")
      .data(d3.range(1))
      .enter()
      .insert("path", ".line")
      .attr("class", "pl area")
      .attr("transform", function(d) {
        return "translate(0," + ((d * $.showreel.gHeight)) + ")";
      })
      .attr("d", function(e) {
        return $.showreel.area(_.map(d.values, function(f) {
          return {
            date: f.date,
            price: 0
          };
        }));
      })
      .style("fill", $.showreel.sameColor(d.key))
      .style("fill-opacity", 0.8);

    d3.select(this)
      .selectAll(".pl.area")
      .transition()
      .duration($.showreel.duration / 2)
      .ease("linear")
      .attr("d", $.showreel.area(d.values));
  });
};
