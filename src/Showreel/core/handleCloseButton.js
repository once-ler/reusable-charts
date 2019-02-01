/* @flow */
export const handleCloseButton = showreel => () => {
  d3.event.stopPropagation()

  const pointer = d3.select('#pointer')
  
  pointer.classed('rectangle', false)

  setTimeout(() => pointer.style('width', '5px').style('height', '5px'), 200)
  
  d3.select('#close-btn').classed('show', false)

  d3.select('#clusterize-grid').classed('not-visible', true)

  showreel.userClickedData = false
}

export default handleCloseButton
