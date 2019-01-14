/* @flow */
import {setupAxisLabels} from './Axis';
import {closestRoundTo} from '../util';

export const setBubbleChartDimensions = ({chartNames, srcdata, data, bubbleChartDimensions, nonZeroOnly}) => {
  const bubbles = _.filter(chartNames, function(d) {
    return d.type == 'bubble';
  });

  const createBubbleChartDimension = h => {
    let possibleValues = _.chain(srcdata).map(h.name).compact().value();
    if (possibleValues.length == 0)
      return;

    const dim = _.pick(h, ['name', 'isDate', 'xpadding', 'isOrdinal']);

    h.isOrdinal && (() => {
      possibleValues = _.uniq(possibleValues).sort();
      possibleValues = _.without(possibleValues, 'NA');
      possibleValues.unshift('NA');
      // lodash v4 replaced _.object w/ _.zipObject
      dim.ordinalValues = _.zipObject(possibleValues, _.range(possibleValues.length));
      dim.ordinalValuesInverted = _.invert(dim.ordinalValues);
      possibleValues = _.values(dim.ordinalValues);
    })();

    dim.extent = d3.extent(possibleValues);
    dim.tickRound = closestRoundTo(dim.extent[1], h.name.search(/\boilage\b|\bgearboxage\b/g) != -1 ? 8 : 5);
    // console.log(closestRoundTo(20, 8));
    dim.dimension = data.dimension(d =>
      !h.isOrdinal ? (d[h.name] ? (+d[h.name]).ceilTo(tickRound) : 0) : (dim.ordinalValues[d[h.name]] || 0)
    );
    // dim.extent = d3.extent(possibleValues);

    // https://github.com/crossfilter/crossfilter/wiki/Crossfilter-Gotchas
    dim.group = dim.dimension.group().reduce(
      //add
      (p, v) => {
        /** "nonZeroOnly" option means non-zero OR if ordinal, not 'NA'. **/
        ((nonZeroOnly && v[h.name] > 0) || !nonZeroOnly || (dim.isOrdinal && v[h.name] != 'NA' && nonZeroOnly) || (dim.isOrdinal && !nonZeroOnly)) &&
          ++p.count;

        !dim.isOrdinal && (p[h.name] += v[h.name]);
        dim.isOrdinal && (p[h.name] = v[h.name]);

        p['tickRound'] = dim.tickRound;
        p['downtimeminutes'] += v['downtimeminutes'];
        
        return p;
      },
      //remove
      (p, v) => {
        ((nonZeroOnly && v[h.name] > 0) || !nonZeroOnly || (dim.isOrdinal && v[h.name] != 'NA' && nonZeroOnly) || (dim.isOrdinal && !nonZeroOnly)) &&
          --p.count;

        !dim.isOrdinal && (p[h.name] -= v[h.name]);
        p['downtimeminutes'] -= v['downtimeminutes'];
        
        return p;
      },
      //init
      () => {
        const d = {};
        d[h.name] = dim.isOrdinal ? '' : 0;
        d['downtimeminutes'] = 0;
        d.count = 0;
        return d;
      }
    );

    const sz = dim.group.size();
    const max = d3.max(dim.group.top(sz), d => d.value.count);
    const colorMax = d3.max(dim.group.top(sz), d => Math.ceil(d.value['downtimeminutes'] / d.value.count));

    dim.yextent = [0, max];
    dim.colorExtent = colorMax == 0 ? 1 : 0;

    const ytickRound = closestRoundTo(dim.yextent[1], 5);
    dim.ytickRound = ytickRound == 0 ? 10 : ytickRound;

    bubbleChartDimensions.push(dim);
  };

  _.each(bubbles, createBubbleChartDimension);

  return bubbleChartDimensions;
};

const constructBubbleChart = ({id, width, height, dim, nonZeroOnly}) => {
  const bubbleChart = dc.bubbleChart(id);
  bubbleChart
    .width(width / 2 - 10)
    .height(Math.round(height / 1.8))
    .margins({
      top: 10,
      right: 20,
      bottom: 40,
      left: 50
    })
    .dimension(dim.dimension) //We need to filter here so the chart will not display zero values
    .group(dim.group)
    .transitionDuration(1500)
    // .colors(colorbrewer2.Blues[9])
    // .colors(colorbrewer2.Greens[4])
    .ordinalColors(colorbrewer2.Greens[4])
    .colorDomain(dim.colorExtent)
    .colorAccessor(p => Math.floor(p.value['downtimeminutes'] / p.value.count))
    .keyAccessor(p => {
      if (p.key == 0) return undefined;
      return p.key - (p.value.tickRound / 2);
    })
    .valueAccessor(p => p.value.count)
    .radiusValueAccessor(function(p) {
      if ((p.key == 0 && nonZeroOnly) || (dim.isOrdinal && nonZeroOnly && dim.ordinalValuesInverted[p.key] == "NA"))
        return 'a'; //1e-6; // 5000;

      if (p.value['downtimeminutes'] > 0) {
        return p.value.count == 0 ? 'a' : 100 + Math.floor(Math.sqrt(p.value['downtimeminutes']) / p.value.count);
      } else {
        return 5;
      }
    })
    .x(d3.scale.linear().domain(dim.extent))
    .y(d3.scale.linear().domain(dim.yextent))
    .r(d3.scale.linear().domain([0, 4000]))
    .xAxisPadding(dim.isOrdinal ? 1 : (dim.tickRound == 0 ? (dim.extent[0] < 5 ? 5 : dim.extent[0]) : dim.tickRound))
    .yAxisPadding(dim.ytickRound)
    .elasticX(true)
    .elasticY(true)
    .maxBubbleRelativeSize(0.3)
    .transitionDuration(600)
    .renderLabel(true)
    .renderTitle(false)
    .label(p => {
      // p.key == 0 means NA, hide it
      if (p.key === 0 || p.value.count === 0) return '';
      return !dim.isOrdinal ? p.value.count : dim.ordinalValuesInverted[p.key];
    });

  return bubbleChart;
};

const createTooltipForBubbleChart = ({hierarchyDict, availableDimensionNames, tooltip, tooltipText}) => {
  d3.selectAll('circle.bubble').on('mouseover', () => tooltip.style("visibility", "visible"));
  
  d3.selectAll('circle.bubble').on('mousemove', d => {
    const caption = _.reduce(d.value, (memo, v, k) => {
      const a = hierarchyDict[k];
      const b = (availableDimensionNames.indexOf(k) != -1);
      const nan = isNaN(v);

      let rangeText;
      (a || b) && (rangeText = '<span>Range: ' + ((d.key - d.value.tickRound) < d.key ? '> ' + (d.key - d.value.tickRound) + ' and <=' + d.key : d.key) + '</span><br/>');

      (k != "tickRound") && (
          memo += '<div>'
          + (nan ? v : (k == 'downtimeminutes' ? 'Downtime' : (k == 'count' ? 'Count' : (a || b ? rangeText : '') + (a ? a : k) + ' Total')))
          + (nan ? '' : ': ') + (nan ? '' : (k == 'downtimeminutes' ? Math.ceil(v / 1440) + ' Days' : v))
          + '</div>'
      );

      return memo;
    }, '');

    tooltipText.html(caption);
// console.log(d3.select('#chart')[0][0].offsetTop);
    const chartEl = d3.select('#chart')[0][0];

    return tooltip.style("top", (d3.event.pageY - chartEl.offsetTop + 25) + "px").style("left", (d3.event.pageX - chartEl.offsetLeft + 36) + "px");
  });

  d3.selectAll('circle.bubble').on('mouseout', () => tooltip.style("visibility", "hidden"));
};

export const buildBubbleCharts = ({bubbleChartDimensions, bubbleCharts, width, height, legend, nonZeroOnly, hierarchyDict, availableDimensionNames, tooltip, tooltipText}) => {

  const createBubbleChart = (dim, i) => {
    const id = "bubble-" + dim.name.replace(/\s/g, '_');
    const div = d3.select("#chart").append("div").attr("id", id);
    const js = 'javascript:dcf.bubbleCharts()[' + i + '].filterAll();dc.redrawAll()';
    div.html('<a class="reset" href="' + js + '" style="visibility: hidden;float:right;margin: 0 10px 0 5px;">reset</a><span class="reset" style="visibility: hidden;float:right;">Current filter: <span class="filter"></span></span><div class="clear"></div>');

    // 
    const bubbleChart = constructBubbleChart({ id: `#${id}`, width, height, dim, nonZeroOnly});

    //Hide x axis
    dim.isOrdinal && (() => {
      bubbleChart.renderlet(function(chart) {
        chart.selectAll("g.x line").style("display", "none");
        chart.selectAll("g.x text").style("display", "none");
      })
    })();

    !dim.isOrdinal && bubbleChart.renderVerticalGridLines(true);

    bubbleChart.render();

    //Get units for each attribute if available
    // This is very custom
    // const du = _.find(analyticsAttributes, d => d['class'] == dim.name);

    //Axis labels config        
    const labels = {
      title: {},
      xlabel: {
        x: width / 3.6,
        y: height / 1.83 - 6,
        // text: (hierarchyDict[dim.name] || dim.name) + (du && du.displayattributeunit.length > 0 ? ' (' + du.displayattributeunit + ')' : (dim.name.search(/\boilage\b|\bgearboxage\b/g) != -1 ? ' (Days)' : ''))
        text: dim.name
      },
      ylabel: {
        x: -height / 8 + 30,
        y: 0,
        text: "Number of Times Down"
      }
    }

    //set Axis labels
    setupAxisLabels(id, labels);

    // legend
    const display = legend[dim.name.replace(/\s/g, '_')];

    /*
    $(display || '<div id="help-info" style="padding:3px 0 0 5px;"><span class="info-spot"><span class="icon-info-round"></span><span class="info-bubble">' +
      'Click on a bubble to filter, any chart that have data inside this range will be filtered.  Multiple bubbles can be selected at the same time.' +
      '</span></span>').insertBefore('#' + id + ' .reset:first');
    */
   
    bubbleCharts.push(bubbleChart);
  }

  _.each(bubbleChartDimensions, createBubbleChart);

  // Now add tooltips.
  createTooltipForBubbleChart({hierarchyDict, availableDimensionNames, tooltip, tooltipText});

  return bubbleCharts;
};
