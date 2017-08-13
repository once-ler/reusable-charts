export const setYAxis = showreel => () => {
  const g = $.showreel.svg.selectAll("g.symbol");
  
  g.each(function(d) {
    const y = d3.scale.linear()
      .domain([0, d.maxActualY])
      .range([$.showreel.gHeight, 0]);
    const yaxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    const rule = d3.select(this)
      .selectAll('.y.axis.left')
      .data([0]);
    
    rule.enter()
      .append("g")
      .attr("opacity", 0)
      .attr("class", "y axis left")
      .style("font-size", "7px")
      .call(yaxis);

    rule
      .transition()
      .duration(600)
      .attr("opacity", 1);

    rule.exit()
      .remove();
  });
};
