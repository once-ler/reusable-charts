/* @flow */
export const moveXAxisLabels = showreel => (x,y) => {
  x = '' + x;
  y = '' + y;
  var text = showreel.svg.selectAll(".x.axis.x0.axis0 text");
  
  text
    .transition()
    .duration(showreel.duration / 2)
    //.attr("transform", function (d) { return "translate(" + x + "," + y + ")"; });
    .attr('transform', function(d) {
      return (!showreel.data[0].isDate ? "rotate(-55, -10,-12)" : "") + "translate(" + x + "," + y + ")";
    });
}
