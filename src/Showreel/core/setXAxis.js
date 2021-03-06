import moment from 'moment'

export const setXAxis = showreel => (g, h, i, o) => {
  // on enter() height/gHeight stays the same, so must force remove ticks.
  g.selectAll(`.x.axis.x${i}.axis${i}`).remove()

  const xaxis = d3.svg.axis()
    .scale(showreel.x)
    .ticks(showreel.monthsCovered < 12 ? 10 : 25)
    .tickSize(-h);
  
  const rule = g.selectAll(`.x.axis.x${i}.axis${i}`)
    .data([h]);

  rule.enter()
    .append("g")
    .attr("opacity", 0)
    .attr("class", `x axis x${i} axis${i}`)
    .attr("transform", d => `translate(0,${d})`)
    .call(xaxis);

  let y = 0;
  rule.each(function(d) {
    if (showreel.data[y] && !showreel.data[y].isDate) {
      const r = showreel.data[y].keys;
      const text = d3.select(this)
        .selectAll('text')
        .attr("transform", "rotate(-55, -10,-12)")
        .attr("text-anchor", "left")
        .text((d, t) => i == 1 ? "" : r[d.getTime()]);
    }
    y++;
  });

  rule
    .transition()
    .duration(600)
    .attr("opacity", o);

  rule.exit()
    .remove();
};
