/* @flow */

export const handleMenuClick = showreel => () => {
  d3.event.stopPropagation();
  const el = d3.event.target
  console.log(d3.select(el))

}
