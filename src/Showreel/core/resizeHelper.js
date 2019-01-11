/* @flow */
export const resizeHelper = showreel => () => {
  $(window)
    .unbind("resize");

  const chart = $("#" + showreel.chartElementName + " svg");
  const aspect = chart.width() / chart.height(),
    container = chart.parent();

  $(window)
    .bind({
      resize: function(event) {
        event.stopPropagation();
        const targetWidth = container.width(); // -$("#sidebar-right").width() - substractLeft;
        chart.attr("width", targetWidth);
        chart.attr("height", Math.round(targetWidth / aspect));
      }
    });

  $(window)
    .trigger('resize');
}

export default resizeHelper
