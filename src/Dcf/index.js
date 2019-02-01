/* @flow */
global.crossfilter = require('crossfilter2');
global.dc = require('dc');
global.d3 = require('d3');
global.colorbrewer2 = require('colorbrewer');
global.moment = require('moment');
global.Clusterize = require('clusterize.js');

import d3dc from './d3dc';

const Dcf = ({availableDimensions, initialHierarchy, legend, hierarchyDict, width, height}) => {

  const dateFormat = d3.time.format("%m/%d/%Y");
  const formatDate = d3.time.format("%Y/%m/%d");
  const numberFormat = d3.format(".2f");
  const availableDimensionNames = _.map(availableDimensions, 'name');
                
  return d3dc({
    availableDimensions,
    initialHierarchy,
    legend,
    hierarchyDict,
    width,
    height,
    dateFormat,
    formatDate,
    numberFormat,
    availableDimensionNames
  });
};

export default Dcf;
