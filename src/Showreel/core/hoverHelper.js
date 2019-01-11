/* @flow */

export const hoverHelper = showreel => () => {
  $('#' + showreel.chartElementName)
    .bind({
      mousemove: showreel.crosshair(),
      mouseout: showreel.handleMouseOutGraph()
    });

  showreel.createDateLabel();

  setTimeout(() => {
    showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);
  }, 300);
}

export default hoverHelper
