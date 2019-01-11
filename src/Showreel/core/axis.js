/* @flow */
export const axis = showreel => () => {
  return d3.svg.line()
    .interpolate('monotone')
    .x(d => {
      return showreel.x(d.date);
    })
    .y(showreel.height)
}

export default axis
