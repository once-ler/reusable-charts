/* @flow */
export const hoverHelper = showreel => () => {
  const chart = d3.select('#' + showreel.chartElementName)
  chart.on('mousemove', null)
  chart.on('mouseout', null)

  chart.on('mousemove', showreel.crosshair())
  chart.on('mouseout', showreel.handleMouseOutGraph())

  // Event handlers for when user clicks on close button.
  const closeBtn = d3.select('#close-btn')
  closeBtn.on('click', null)
  closeBtn.on('click', showreel.handleCloseButton())

  d3.selectAll('.symbol').on('click', showreel.handleNodeClick())

  d3.selectAll('.menu-item').on('click', showreel.handleMenuClick())

  showreel.createDateLabel();

  setTimeout(() => {
    showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);
  }, 300);
}

export default hoverHelper
