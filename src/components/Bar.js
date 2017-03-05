/* @flow */
import _ from 'lodash';

export setBarChartDimensions = () => {
  const bars = _.filter(chartNames, d => d.type == 'bar');

  const createBarChartDimension = h => {
    const dim = Object.assign({}, h);
    dim.isOrdinal = h.isOrdinal ? h.isOrdinal : false;

    dim.isOrdinal && (
      dim.domain = _.chain(srcdata).map(dim.name).uniq().sort().value()
    );

    dim.dimension = data.dimension(d => h.isDate ? d.month : +d[h.name]);

    dim.group = dim.dimension.group().reduceSum(d => h.name.search(/\bdowntimeminutes\b/gi) != -1 || !h.isDate ? Math.round(d['downtimeminutes'] / 1440) : Math.round(+d[h.name]));

    if (!dim.dimension.bottom(1)[0])
        return;

    dim.extent = [dim.dimension.bottom(1)[0][!h.isDate ? h.name : 'faildate'], dim.dimension.top(1)[0][!h.isDate ? h.name : 'faildate']];

    barChartDimensions.push(dim);
  };

  _.each(bars, createBarChartDimension);
};

const stream = _.flow([
  dim => {
    barChart
      .width(width / 2 - 10)
      .height(height / 2.5)
      .transitionDuration(500) // (optional) define chart transition duration, :default = 500
      .margins({ top: 10, right: 10, bottom: 40, left: 30 })
      .dimension(dim.dimension) // set dimension
      .group(dim.group) // set group
      .elasticY(true)
      .xAxisPadding(!dim.isDate ? dim.xpadding : 20)
      .elasticX(true)
      .centerBar(!dim.isOrdinal ? true : false)
      .renderHorizontalGridLines(true);
    return dim;
  },
  dim => {
    dim.isOrdinal && (() => {
      dim.domain = _.without(dim.domain, 'NA');
      barChart.x(d3.scale.ordinal().domain(dim.domain)).xUnits(dc.units.ordinal);
      setTimeout(barChart.redraw, 100);
    })();                  
    return dim;
  },
  dim => {
    !dim.isOrdinal && !dim.isDate && barChart.x(d3.scale.linear().domain(dim.extent));
    return dim;
  },
  dim => {
    !dim.isOrdinal && dim.isDate &&
      barChart
        .width(width - 10)
        .x(d3.time.scale().domain(dim.extent))
        .round(d3.time.month.round)
        .xUnits(d3.time.months);
    return dim;
  }
]);

export buildBarCharts = () => {
  const createBarChart = (dim, i) => {
    const id = `bar-${dim.name.replace(/\s/g, '_')}`;
    const div = d3.select("#chart").append("div").attr("id", id);
    const js = `javascript:dcf.barCharts()[${i}].filterAll();dc.redrawAll()`;

    div.html(`${dim.name.search(/\bdowntimeminutes\b/g) != -1 ? '<div id="data-count" class="dc-data-count"><span class="filter-count"></span> selected out of <span class="total-count"></span> records</div>' : ''}<a class="reset" href="${js}" style="visibility: hidden;">reset</a><span class="reset" style="visibility: hidden;">Current filter: <span class="filter"></span></span><div class="clear"></div>`);

    const barChart = dc.barChart(`#${id}`);
    
    stream(dim);
/*
    if (dim.isOrdinal) {
      dim.domain = _.without(dim.domain, 'NA');
      barChart.x(d3.scale.ordinal().domain(dim.domain)).xUnits(dc.units.ordinal);
      setTimeout(barChart.redraw, 100);
    } else {
      if (!dim.isDate) {
          barChart.x(d3.scale.linear().domain(dim.extent));
      } else {
        barChart
          .width(width - 10)
          .x(d3.time.scale().domain(dim.extent))
          .round(d3.time.month.round)
          .xUnits(d3.time.months);
      }
    }
*/
    barChart.render();

    //Axis labels config        
    const labels = { 
      title: { x: width / 2, y: 0, text: '' },
      xlabel: { x: dim.isDate ? width / 2 : width / 3 / 2, y: height / 2.5 - 6, text: !dim.isDate ? dim.name : 'Fail Date' },
      ylabel: { x: -(height / 2 / 4 - 29), y: 0, text: dim.name.search(/\bdowntimeminutes\b/gi) != -1 || !dim.isDate ? 'Downtime (Days)' : (hierarchyDict[dim.name] || dim.name) + (dim.name.search(/\boilage\b|\bgearboxage\b/gi) != -1 ? " (Days)" : "") }
    }

    //set Axis labels
    setupAxisLabels(id, labels);

    // Info bubble
    /*
    $('<div id="help-info" style="padding:3px 0 0 5px;"><span class="info-spot"><span class="icon-info-round"></span><span class="info-bubble">' +
    'Brush the chart to create a sliding window, any chart that have data inside this range will be filtered.' +
    '</span></span>').insertBefore('#' + id);
    */
   
    barCharts.push(barChart);
  };

  _.each(barChartDimensions, createBarChart);
};