/* @flow */

export const handleNodeClick = showreel => (d, i) => {
  d3.event.stopPropagation();

  // When the user has already clicked on a node, we must wait for the user to close the popup.
  if (showreel.userClickedData) return; 

  showreel.userClickedData = true

  const symbol = d.key
  const x = d3.select('.date-label tspan.tspan-0').text()

  // Transform pointer to rectangle
  d3.select('#pointer').style('width', '400px').style('height', '300px')
  d3.select('#pointer').classed('rectangle', true)
  d3.select('#close-btn').classed('show', true);

  // Make sure the display is visible
  console.log(d3.event.pageX, d3.event.pageY, showreel.absoluteCoordinates.ROOT.width)
  if ((d3.event.pageX + 500) > showreel.absoluteCoordinates.ROOT.width) {
    let left = `${showreel.absoluteCoordinates.ROOT.width - 500}px`,
      width = '400px'
    if (showreel.absoluteCoordinates.ROOT.width < 500) {
      width = `${showreel.absoluteCoordinates.ROOT.width - 10}px`
      left = '10px'
    }
    d3.select('#pointer').style('left', left).style('width', width)        
  }

  if ((d3.event.pageY + 500) > showreel.absoluteCoordinates.ROOT.height) {
    let top = `${showreel.absoluteCoordinates.ROOT.height - 500 - showreel.margin.bottom - showreel.margin.top}px`,
      height = '300px'
    if (showreel.absoluteCoordinates.ROOT.height < 500) {
      height = `${showreel.absoluteCoordinates.ROOT.height - 10}px`
      top = '10px'
    }
    d3.select('#pointer').style('top', top).style('height', height) 
  }
}

export default handleNodeClick
