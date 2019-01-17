/* @flow */
export const handleCloseButton = showreel => () => {
  console.log('handled')
  d3.event.stopPropagation()

  d3.select('#pointer').classed('rectangle', false)
  d3.select('#close-btn').classed('show', false)
  showreel.userClickedData = false
}

export default handleCloseButton
