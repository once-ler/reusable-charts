/* @flow */

const setupAxisLabels = (id, lables) => {
  const xtitle = d3.select('#' + id + ' svg').selectAll('.x.title').data([[0]]);
  xtitle.enter().append('text')
    .attr("class", "x title")
    .attr("text-anchor", "end")
    .attr("x", lables['title'].x)
    .attr("y", 25);
    xtitle.exit().remove();

  const xlabels = d3.select('#' + id + ' svg').selectAll('.x.label').data([[0]]);
  xlabels.enter().append('text')
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", lables['xlabel'].x)
    .attr("y", lables['xlabel'].y);
    xlabels.exit().remove();

  const ylabels = d3.select('#' + id + ' svg').selectAll('.y.label').data([[0]]);
  ylabels.enter().append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("x", lables['ylabel'].x)
    .attr("transform", "rotate(-90)")
    ylabels.exit().remove();

  xtitle.text(lables['title'].text);
  xlabels.text(lables['xlabel'].text);
  ylabels.text(lables['ylabel'].text);
};

export setupAxisLabels;
