/* @flow */
export const line = showreel => () => {
  return d3.svg.line()
    .interpolate('monotone')
    .x(function(d) {
      return showreel.x(d.date);
    })
    .y(function(d) {
      return showreel.y(d.price);
    })
}

export default line
