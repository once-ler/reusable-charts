/* @flow */

export const redrawLabels = showreel => () => {
  setTimeout(() => {
    d3.selectAll(".date-label-group").remove();
    showreel.createDateLabel();
    setTimeout(() => {
      showreel.displayValueLabelsForPositionX(showreel.width - showreel.margin.left - showreel.margin.right + 20);

      //xaxis
      if (showreel.currentChart == "horizons") {
        const g = showreel.svg.selectAll(".symbol");
        g.selectAll(".x.axis.x0.axis0").remove();
        showreel.setXAxis(g, showreel.gHeight, 0, 1);        
      }

      setTimeout(() => {
        showreel.translateHelperLabels()();
      }, 100);

    }, 100);

  }, showreel.duration);
}

export default redrawLabels
