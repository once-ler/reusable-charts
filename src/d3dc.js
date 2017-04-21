import { setBarChartDimensions, buildBarCharts } from './components/Bar';
import { setLineChartDimensions, buildLineCharts } from './components/Line';
import { setBubbleChartDimensions, buildBubbleCharts } from './components/Bubble';
import { cleanupLayout } from './util';

export default ({
  availableDimensions,
  initialHierarchy,
  legend,
  width,
  height,
  dateFormat,
  formatDate,
  numberFormat,
  availableDimensionNames
}) => {

  let hierarchy;
  let srcdata, data, groupAll, dimension;
  let dataCount;
  let nonZeroOnly = true;
  let barCharts = [], bubbleCharts = [], lineCharts = [];
  let bubbleChartDimensions = [], barChartDimensions = [], lineChartDimensions = [];
  //After user has selected
  let chartNames = []; 

  return ({

    setupData: (jso, requestNonZeroOnly) => {
      if (srcdata) return;
      // If set to true, only non zero dimension group by value will be displayed.
      // Note however that zero value dimension group still need to be processed, 
      // the chart will just not display it.
      nonZeroOnly = requestNonZeroOnly;

      srcdata = jso;

      // pre-calculate month for better performance
      // But, we shouldn't know about faildate.
      srcdata.forEach(e => e.month = d3.time.month(e['faildate']));          
    },

    updateChart: () => {
      //Cleanup
      deregisterAllCharts();

      /*
      //Add info bubble
      if ($('#help-info').children().size() == 0) {
        $("#help-info").append('<div id="help-info-main" class="with-small-padding"><span class="tag mid-margin-right">Crossfilter</span><span class="info-spot"><span class="icon-info-round"></span><span class="info-bubble">' +
        'Multidimensional analysis allows users to interact with multiple charts at the same time.  Filter as many charts as desired and reset them at any time.' +
        '</span></span>' +
        '</div>');
      }
      */

      /*
      Need to integrate grid.
      */
      // if (!srcdata || srcdata.length == 0)
      //   return grid.gridUpdate([], true);

      data = crossfilter(srcdata);

      //set the group function
      groupAll = data.groupAll();

      //pick out user defined dimensions
      chooseDimensions();

      //setup dimensions for each type of chart (reset)
      setLineChartDimensions(chartNames, srcdata, lineChartDimensions);
      setBarChartDimensions(chartNames, srcdata, barChartDimensions);
      setBubbleChartDimensions(chartNames, srcdata, bubbleChartDimensions);

      //build the charts in this sequence
      const lines = buildLineCharts(lineChartDimensions, lineCharts);
      const bars = buildBarCharts(barChartDimensions, barCharts);
      buildDataCount();
      const bubbles = buildBubbleCharts(bubbleChartDimensions, bubbleCharts);
    },

    /***
    Pick out the user-defined dimensions.
    // Test: downtimeminutes
    ***/
    chooseDimensions: () => {
      (chartNames.length == 0) && (hierarchy = initialHierarchy);

      const h1 = hierarchy.slice();
      // h1.unshift('downtimeminutes');

      //reset
      chartNames = [];
      _.each(h1, d => {
        const n = _.find(availableDimensions, a => a.name == d);
        chartNames.push(n);
      });
    },

    resetDimensions: dimArray => _.each(dimArray, d => d.dimension.remove()),

    //branch from Jason Davies
    resetAllDimensions: () => {
      resetDimensions(barChartDimensions);
      resetDimensions(bubbleChartDimensions);
      resetDimensions(lineChartDimensions);
    },

    deregisterAllCharts: () => {
      crossfilter([]);

      //reset all the filters first
      dc.filterAll();

      resetAllDimensions();

      //tooltip listeners
      d3.selectAll('circle.bubble').on('mouseover', null);
      d3.selectAll('circle.bubble').on('mousemove', null);
      d3.selectAll('circle.bubble').on('mouseout', null);

      dc.deregisterAllCharts();

      barCharts = [];
      barChartDimensions = [];
      bubbleCharts = [];
      bubbleChartDimensions = [];
      lineCharts = [];
      lineChartDimensions = [];

      //reset svg
      cleanupLayout();
    },

    buildDataCount: () => {
      dataCount = dc.dataCount("#data-count")
      .dimension(data) // set dimension to all data
      .group(groupAll); // set group to ndx.groupAll()

      setTimeout(() => dc.redrawAll(), 0);
    }

  });

};
