/* @flow */
import moment from 'moment'

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
  
  const dateRange = {
    min: d3.min(showreel.data, d => d.values[0].date),
    // max: d3.max(showreel.data, d => d.values[d.values.length - 1].date) 
    max: new Date().getTime()
  }

  const c = moment(dateRange.max).diff(moment(dateRange.min), 'months')
  showreel.monthsCovered = c;

  showreel.xAxis = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]); //used by mousemove

  showreel.xAxis.domain([dateRange.min, dateRange.max])

  showreel.x = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]);
  
  // Compute the minimum and maximum date across symbols. (for axis)  
  showreel.x.domain([dateRange.min, dateRange.max])
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

  const text_node = showreel.svg.append("svg:text");
  
  /*
  let extra = "";
  text_node.append("tspan")
    .attr("class", "svgTitle")
    .text(extra + 'dimension')
    .attr("x", showreel.margin.left / 3)
    .attr("y", "-1.3em");

  text_node.append("tspan")
    .attr("class", "svgTitle2")
    .text('report')
    .attr("dx", "0.4em")
    .attr("dy", "0em");
  */

  const g = showreel.svg.selectAll("g")
    .data(showreel.data);

  g.enter()
    .append("g")
    .attr("class", "symbol")
    .append("svg:text")
        .text(d => d.key)
        .attr("class", "svgTitle2")
        .attr('dy', -10)

  g.exit()
    .remove(); //when we change the data source, the elements should auto update

  showreel.resizeHelper();
}

export default initDimensions
