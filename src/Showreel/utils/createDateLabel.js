export const createDateLabel = showreel => () => {
  const date = new Date();
  // placeholder just so we can calculate a valid width
  // create the date label to the left of the scaleButtons group
  const g = $.showreel.svg.selectAll(".symbol");
  const buttonGroup = g.append("svg:g")
    .attr("class", "date-label-group");
  const text_node = buttonGroup.append("svg:text")
    .attr("class", "date-label")
    .attr("text-anchor", "start")
    .attr("opacity", $.showreel.firstLabel ? 1 : 0)
    .attr("y", 10)
    .attr("x", $.showreel.margin.left);

  if ($.showreel.firstLabel)
    $.showreel.firstLabel = !$.showreel.firstLabel;

  //date
  text_node.append('tspan')
    .attr('x', '2.2em')
    .attr('class', 'tspan-0');

  //percentage difference
  text_node.append('tspan')
    .attr('dx', '4.5em')
    .attr('dy', '1.2em')
    .attr('class', 'tspan-1');

  //entity 2 compared to
  text_node.append('tspan')
    .attr('dx', '0.3em')
    .attr('dy', '-0.9em')
    .attr('class', 'tspan-2');

  //entity name 
  text_node.append('tspan')
    .attr('x', '20em')
    .attr('dy', '-1.1em')
    .attr('class', 'tlegend-name');
  //entity value
  text_node.append('tspan')
    .attr('dx', '0.2em')
    .attr('dy', '0em')
    .attr('class', 'tlegend-value');

  g.each(function(d, i) {
    d3.select(this)
      .select("text.date-label tspan.tspan-0")
      .attr("fill", $.showreel.darkerColor(d.key));

    d3.select(this)
      .select("text.date-label tspan.tlegend-name")
      .text(`${d.key}: `)
      .attr("font-size", "10px")
      .attr("fill", $.showreel.darkerColor(d.key));

    d3.select(this)
      .select("text.date-label tspan.tlegend-value")
      .attr("font-size", "12px")
      .attr("fill", $.showreel.darkerColor(d.key));

    $.showreel.currentUserPositionX[d.key] = 0;
  });
};
