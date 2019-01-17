/* @flow */

export const handleNodeClick = showreel => () => {
  d3.event.stopPropagation();

  showreel.userClickedData = true

  const y = d3.event.pageY
  
  let symbol
  
  _.every(showreel.absoluteCoordinates, (d, k) => {
    const top = d.top,
      bottom = d.bottom + (d.height/2)

    // console.log(k, top, bottom, y, d)
    const test = (y >= top && y <= bottom)
    if (test) symbol = k
    return !test
  })

  console.log(symbol)

  const x = d3.select('.date-label tspan.tspan-0').text()

  console.log(x)

  // Transform pointer to rectangle
  d3.select('#pointer').classed('rectangle', true)
  d3.select('#close-btn').classed('show', true);
  /*
  setTimeout(
    () => {
      d3.select('#pointer').classed('rectangle', false);
      d3.select('#close-btn').classed('show', false);
    }, 3000)
  */
}

export default handleNodeClick
