/* @flow */

export const handleMenuClick = showreel => function() {
  d3.event.stopPropagation();
  
  console.log(d3.select(this))

}
