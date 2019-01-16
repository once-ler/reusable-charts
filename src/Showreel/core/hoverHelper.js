/* @flow */

export const hoverHelper = showreel => () => {
  const chart = d3.select('#' + showreel.chartElementName)
  chart.on('mousemove', null)
  chart.on('mouseout', null)

  chart.on('mousemove', showreel.crosshair())
  chart.on('mouseout', showreel.handleMouseOutGraph())

  chart.on('click', function(d,i){
    d3.event.stopPropagation();

    const y = d3.event.pageY
    // TODO: Need this to be consistent with date label
    const x = showreel.xAxis.invert(d3.event.pageX + showreel.margin.left + showreel.margin.right)
    console.log(x)

    let found
    
    _.every(showreel.absoluteCoordinates, (d, k) => {
      const top = d.top,
        bottom = d.bottom + (showreel.margin.top)

      // console.log(k, top, bottom, y, d)
      const test = (y >= top && y <= bottom)
      if (test) found = k
      return !test
    })

    console.log(found)

  })

/*
  const svg = d3.select('#' + showreel.chartElementName + ' svg')
  svg.on('click', function(d, i) {
    console.log(d)
    // d3.event.stopPropagation();
    const mouse = d3.mouse(d3.event.target)
    
    const el = d3.select(this)

    console.log(el)

    // console.log(mouse)
    const xValue = showreel.xAxis.invert(mouse[0]);
    const yValue = showreel.yAxis;
    
    console.log(xValue, yValue.tickSize())
  })
*/



  showreel.createDateLabel();

  setTimeout(() => {
    showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);
  }, 300);
}

export default hoverHelper
