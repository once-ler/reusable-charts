/* @flow */
export const translateHelperLabels = showreel => () => {
  if (showreel.currentChart == "bars" || showreel.currentChart == "lines" || showreel.currentChart == "horizons" || showreel.currentChart == "areas") {
    return () => {
      const t = showreel.svg.selectAll(".symbol")
        .transition()
        .duration(showreel.duration / 2);

      t.selectAll('text.date-label')
        .attr("opacity", 1);

      t.each((d, i) => {

        //just want one date to diaplay
        const e = d3.select(this)
          .selectAll('text.date-label tspan.tspan-0');
        e.each((f, j) => {
          if (i > 0)
            d3.select(this)
            .transition()
            .duration(showreel.duration / 2)
            .attr("fill-opacity", 1);
        });

        d3.select(this)
          .selectAll('text.date-label')
          .transition()
          .duration(showreel.duration / 2)
          .attr("y", showreel.currentChart == "horizons" ? 20 : 10);

      });

      if (showreel.currentChart == "horizons") {
        showreel.moveXAxisLabels(0, -15);
      } else {
        showreel.moveXAxisLabels(0, 0);
      }

    };
  } else {
    return () => {
      const t = showreel.svg.selectAll(".symbol")
        .transition()
        .duration(showreel.duration / 2);

      t.selectAll('text.date-label')
        .attr("opacity", 1);

      t.each((d, i) => {
        //just want one date to diaplay
        if (d.isDate) {
          const e = d3.select(this)
            .selectAll('text.date-label tspan.tspan-0');
          e.each((f, j) => {
            if (i > 0)
              d3.select(this)
              .transition()
              .duration(showreel.duration / 2)
              .attr("fill-opacity", 0);
          });
        }

        d3.select(this)
          .selectAll('text.date-label')
          .transition()
          .duration(showreel.duration / 2)
          .attr("y", (i * (showreel.gHeight / 2)) + (i * 5));

      });

      if (showreel.currentChart == "horizons") {
        showreel.moveXAxisLabels(0, -15);
      } else {
        showreel.moveXAxisLabels(0, 0);
      }

    };
  }
}

export default translateHelperLabels
