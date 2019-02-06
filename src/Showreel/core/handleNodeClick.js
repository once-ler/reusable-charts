/* @flow */

export const handleNodeClick = showreel => (d, i) => {
  d3.event.stopPropagation();

  // When the user has already clicked on a node, we must wait for the user to close the popup.
  if (showreel.userClickedData) return; 

  const x = d3.select('.date-label tspan.tspan-0').text()
  
  let dtClicked
    
  if (d.isDate) {
    try {
      dtClicked = new Date(x)
      if (dtClicked < d.minDate || dtClicked > moment(d.maxDate).add(1, 'months'))
        return
    } catch (e) {
      return;
    }
  }

  // Can now proceed.
  showreel.userClickedData = true

  // Transform pointer to rectangle
  d3.select('#pointer').style('width', '500px').style('height', '300px')
  d3.select('#pointer').classed('rectangle', true)
  d3.select('#close-btn').classed('show', true);
  // Show grid
  d3.select('#clusterize-grid').classed('not-visible', false)
  // Fetch data
  
  console.log(dtClicked)
  const search = {
    toStore: d.key.toLowerCase(),
    fromDateTime: moment(dtClicked).subtract(7, 'days').toISOString().slice(0, 23),
    toDateTime: moment(dtClicked).add(7, 'days').toISOString().slice(0, 23)
  }
  console.log(search)
  // showreel.testGetReddit()
  showreel.testGetStatic()
  
  // Make sure the display is visible
  // console.log(d3.event.pageX, d3.event.pageY, showreel.absoluteCoordinates.ROOT.width)
  if ((d3.event.pageX + 500) > showreel.absoluteCoordinates.ROOT.width) {
    let left = `${showreel.absoluteCoordinates.ROOT.width - 460 - ((showreel.margin.right + showreel.margin.left) / 2)}px`,
      width = '500px'
    if (showreel.absoluteCoordinates.ROOT.width < 500) {
      width = `${showreel.absoluteCoordinates.ROOT.width - 10}px`
      left = '10px'
    }
    d3.select('#pointer').style('left', left).style('width', width)        
  }

  if ((d3.event.pageY + 500) > showreel.absoluteCoordinates.ROOT.height) {
    let top = `${showreel.absoluteCoordinates.ROOT.height - 460 - showreel.margin.bottom - showreel.margin.top}px`,
      height = '300px'
    if (showreel.absoluteCoordinates.ROOT.height < 500) {
      height = `${showreel.absoluteCoordinates.ROOT.height - 10}px`
      top = '10px'
    }
    d3.select('#pointer').style('top', top).style('height', height) 
  }
}

export default handleNodeClick
