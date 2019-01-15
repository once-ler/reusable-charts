/* @flow */

export const hoverHelper = showreel => () => {
  const chart = d3.select('#' + showreel.chartElementName)
  chart.on('mousemove', null)
  chart.on('mouseout', null)

  chart.on('mousemove', showreel.crosshair())
  chart.on('mouseout', showreel.handleMouseOutGraph())

  showreel.createDateLabel();

  setTimeout(() => {
    showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);
  }, 300);
}

export default hoverHelper
