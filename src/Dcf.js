/* @flow */
import d3 from 'd3';
import d3dc from './d3dc';

const Dcf = (...args) => {

  const [availableDimensions, initialHierarchy, legend] = args;
  
  const width = 960;
  const height = 320;
  const dateFormat = d3.time.format("%m/%d/%Y");
  const formatDate = d3.time.format("%Y/%m/%d");
  const numberFormat = d3.format(".2f");
  const availableDimensionNames = _.map(availableDimensions, 'name');
                
  return d3dc({
    availableDimensions,
    initialHierarchy,
    legend,
    width,
    height,
    dateFormat,
    formatDate,
    numberFormat,
    availableDimensionNames
  });
};

export default Dcf;
