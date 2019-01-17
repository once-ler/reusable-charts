/* @flow */

export const handleNodeClick = showreel => (d, i) => {
  d3.event.stopPropagation();

  // When the user has already clicked on a node, we must wait for the user to close the popup.
  if (showreel.userClickedData) return; 

  showreel.userClickedData = true

  const symbol = d.key
  const x = d3.select('.date-label tspan.tspan-0').text()

  // Transform pointer to rectangle
  d3.select('#pointer').classed('rectangle', true)
  d3.select('#close-btn').classed('show', true);
}

export default handleNodeClick
