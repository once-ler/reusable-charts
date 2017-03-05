/* @flow */
import d3dc from './d3dc';
import Axis from 'Axis';
import _ from 'lodash';

const Dcf = (...args) => {

  const [availableDimensions, initialHierarchy, legend] = args;
  
  const width = 960;
  const height = 320;
  const dateFormat = d3.time.format("%m/%d/%Y");
  const formatDate = d3.time.format("%Y/%m/%d");
  const numberFormat = d3.format(".2f");
  const availableDimensionNames = _.map(availableDimensions, 'name');

  let hierarchy;
  let srcdata, data, groupAll, dimension;
  let dataCount;
  let nonZeroOnly = true;
  let barCharts = [], bubbleCharts = [], lineCharts = [];
  let bubbleChartDimensions = [], barChartDimensions = [], lineChartDimensions = [];
  //After user has selected
  let chartNames = [];
                
  /***
  Pick out the user-defined dimensions.
  // Test: downtimeminutes
  ***/
  const chooseDimensions = () => {
    (chartNames.length == 0) && (hierarchy = initialHierarchy);

    const h1 = hierarchy.slice();
    // h1.unshift('downtimeminutes');

    //reset
    chartNames = [];
    _.each(h1, d => {
      const n = _.find(availableDimensions, a => a.name == d);
      chartNames.push(n);
    });
  };

  const resetDimensions = dimArray => _.each(dimArray, d => d.dimension.remove());

  //branch from Jason Davies
  const resetAllDimensions = () => {
    resetDimensions(barChartDimensions);
    resetDimensions(bubbleChartDimensions);
    resetDimensions(lineChartDimensions);
  };

  const deregisterAllCharts = () => {
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
  };

};

export default Dcf;
