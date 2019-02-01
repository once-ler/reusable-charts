/* @flow */

export const translateHelper = showreel => n => {
  if (n == "bars" || n == "lines" || n == "horizons" || n == "areas") {
    return () => {

      const t = showreel.svg.selectAll(".symbol")
        .transition()
        .duration(showreel.duration / 2);

      t.selectAll('text.date-label')
        .attr("opacity", 0);

      t.each(function(d, i) {
        var tln = d3.select(this)
          .attr("transform");
        
        d3.select(this)
          .transition()
          .duration(showreel.duration / 2)
          .attr("transform", "translate(0," + ((i * showreel.gHeight) + (i * 40)) + ")");
      });
    }
  }

  return () => {
    const t = showreel.svg.selectAll(".symbol")
      .transition()
      .duration(showreel.duration / 2);
    
    t.selectAll('text.date-label')
      .attr("opacity", 0);
    t.attr("transform", "translate(0,0)");
  }
}

export default translateHelper
