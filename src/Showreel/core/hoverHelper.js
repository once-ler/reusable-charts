/* @flow */

export const hoverHelper = showreel => () => {
  const chart = d3.select('#' + showreel.chartElementName)
  chart.on('mousemove', null)
  chart.on('mouseout', null)

  chart.on('mousemove', showreel.crosshair())
  chart.on('mouseout', showreel.handleMouseOutGraph())

  // Event handlers for when user clicks on close button.
  const closeBtn = d3.select('#close-btn')
  console.log(closeBtn)
  closeBtn.on('click', null)
  closeBtn.on('click', showreel.handleCloseButton())

  chart.on('click', showreel.handleNodeClick())

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

  document.getElementById('close-btn').addEventListener('click', function() {
    console.log('got it')
  })

  showreel.createDateLabel();

  setTimeout(() => {
    showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);
  }, 300);
}

export default hoverHelper
