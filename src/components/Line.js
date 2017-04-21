/* @flow */

export const setLineChartDimensions = (chartNames, srcdata, lineChartDimensions) => {
  const lines = _.filter(chartNames, function (d) { return d.type == 'line'; });
  
  const createLineChartDimension = h => {
    !h.isOrdinal && h.isDate && (() => {
      const dim = {
        name: h.name,
        isDate: true,
        xpadding: h.xpadding,
        isOrdinal: false,
        dimension: data.dimension(d => d.month),
        group: dim.dimension.group().reduceSum(d => Math.round((h.name.search(/\bdowntimeminutes\b/gi) != -1 ? 1 / 1440 : 1) * +d[h.name])),
        extent: [dim.dimension.bottom(1)[0]['faildate'], dim.dimension.top(1)[0]['faildate']]
      };
      
      lineChartDimensions.push(dim);              
    })()
  };

  _.each(lines, createLineChartDimension);

  return lineChartDimensions;
};

export const buildLineCharts = (lineChartDimensions, lineCharts) => {
  const createLineChart = (dim, i) => {
    const id = "line-" + dim.name.replace(/\s/g, '_');
    const div = d3.select("#chart").append("div").attr("id", id);
    const js = `javascript:dcf.lineCharts()[${i}].filterAll();dc.redrawAll()`;
    div.html(`<div id="data-count" class="dc-data-count">
      <span class="filter-count"></span> selected out of <span class="total-count"></span> records</div>
      <a class="reset" href="${js}" style="visibility: hidden;">reset</a>
      <span class="reset" style="visibility: hidden;">Current filter: <span class="filter"></span>
      </span><div class="clear"></div>`);

    const lineChart = dc.lineChart(`#${id}`);
    lineChart
      .width(width / 2 - 10)
      .height(height / 2)
      .transitionDuration(500)
      .margins({ top: 0, right: 10, bottom: 40, left: 30 })
      .dimension(dim.dimension)
      .group(dim.group)
      .elasticY(true)
      .xAxisPadding(20)
      .yAxisPadding(50)
      .elasticX(true)
      .width(width - 10)
      .renderArea(true)
      .x(d3.time.scale().domain(dim.extent))
      .round(d3.time.month.round)
      .xUnits(d3.time.months);

    lineChart.render();

    // Need to dynamically render axis labels.
    // Axis labels config        
    const labels = { title: { x: width / 2, y: 0, text: '' },
        xlabel: { x: width / 2, y: height / 2 - 6, text: 'Fail Date' },
        ylabel: { x: -(height / 2 / 4 - 25), y: 0, text: !dim.isDate || dim.name.search(/\bdowntimeminutes\b/gi) != -1 ? 'Downtime (Days)' : (hierarchyDict[dim.name] || dim.name) + (dim.name.search(/\boilage\b|\bgearboxage\b|\bdowntimeminutes\b/gi) != -1 ? " (Days)" : "") }
    }

    //set Axis labels
    setupAxisLabels(id, labels);

    // Info bubble
    /*
    $('<div id="help-info" style="padding:3px 0 0 5px;"><span class="info-spot"><span class="icon-info-round"></span><span class="info-bubble">' +
    'Brush the chart to create a sliding window, any chart that have data inside this range will be filtered.' +
    '</span></span>').insertBefore('#' + id);
    */
   
    lineCharts.push(lineChart);
  };

  _.each(lineChartDimensions, createLineChart);

  return lineCharts;
};
