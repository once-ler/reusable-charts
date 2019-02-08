/* @flow */
import moment from 'moment'

export const updateData = showreel => data => {
  if (data && Array.isArray(data)) {
    showreel.data = data
  }

  const g = showreel.svg.selectAll("g.symbol")
    .data(showreel.data);

  g.enter()
    .append("g")
    .attr("class", "symbol")
    
  g.exit()
    .remove(); //when we change the data source, the elements should auto update
}

export const updateXDomain = showreel => () => {
  const dateRange = {
    min: d3.min(showreel.data, d => d.values[0] ? d.values[0].date: null),
    // max: d3.max(showreel.data, d => d.values[d.values.length - 1].date) 
    max: new Date().getTime()
  }

  const c = moment(dateRange.max).diff(moment(dateRange.min), 'months')
  showreel.monthsCovered = c;

  showreel.xAxis.domain([dateRange.min, dateRange.max])

  // Compute the minimum and maximum date across symbols. (for axis)  
  showreel.x.domain([dateRange.min, dateRange.max])
}

export const initDimensions = showreel => () => {
  showreel.width = showreel.width - showreel.margin.right - showreel.margin.left;
  showreel.originalWidth = showreel.width;
  showreel.gHeight = showreel.data.length == 1 ? 180 : (showreel.data.length == 2 ? 105 : 65);
  showreel.height = (showreel.gHeight * showreel.data.length) + (1 * (showreel.margin.top + showreel.margin.bottom));

  showreel.y = d3.scale.linear()
    .range([showreel.gHeight, 0]);

  showreel.yAxis = d3.svg.axis()
    .scale(showreel.y)
    .ticks(4)
    .orient("right");

  showreel.xAxis = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]); //used by mousemove
  
  showreel.x = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]);
  
  // x and xAxis must be set up before call!
  updateXDomain(showreel)()

  showreel.svgWidth = showreel.width + showreel.margin.right + showreel.margin.left;
  showreel.svgHeight = showreel.height + showreel.margin.top + showreel.margin.bottom;
  
  showreel.svg = d3.select('#' + showreel.chartElementName)
    .append("svg")
    .attr("width", showreel.svgWidth)
    .attr("height", showreel.svgHeight)
    .attr("viewBox", "0 0 " + showreel.svgWidth + " " + showreel.svgHeight)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("class", "gmain")
    .attr("transform", "translate(" + showreel.margin.left + "," + showreel.margin.top + ")");

  updateData(showreel)()

  showreel.resizeHelper();
}

export default initDimensions
