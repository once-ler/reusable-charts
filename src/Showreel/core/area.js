/* @flow */
export const area = showreel => () => {
  return d3.svg.area()
    .interpolate('monotone')
    .x(function(d) {
      return showreel.x(d.date);
    })
    .y0(showreel.height)
    .y1(function(d) {
      return showreel.y(d.price);
    })
}

export default area
