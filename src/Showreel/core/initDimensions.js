/* @flow */
import moment from 'moment'

export const initDimensions = showreel => () => {
  showreel.width = showreel.width - showreel.margin.right - showreel.margin.left;
  showreel.originalWidth = showreel.width;
  showreel.gHeight = showreel.data.length == 1 ? 180 : (showreel.data.length == 2 ? 105 : 65);
  showreel.height = (showreel.gHeight * showreel.data.length) + (2 * (showreel.margin.top + showreel.margin.bottom));

  showreel.y = d3.scale.linear()
    .range([showreel.gHeight, 0]);

  showreel.yAxis = d3.svg.axis()
    .scale(showreel.y)
    .ticks(4)
    .orient("right");
  
  /*
  const dateRange = _.reduce(showreel.data, (m, d) => {
    if (m.min == 0 || d.minDate < m.min)
      m.min = d.minDate

    if (m.max == 0 || d.maxDate > m.max)
      m.max = d.maxDate

    return m;
  }, {min: 0, max: 0});
  */

  const dateRange = {
    min: d3.min(showreel.data, d => d.values[0].date),
    max: d3.max(showreel.data, d => d.values[d.values.length - 1].date) 
  }

  const c = moment(dateRange.max).diff(moment(dateRange.min), 'months')
  showreel.monthsCovered = c;

  showreel.xAxis = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]); //used by mousemove
/**  
  showreel.xAxis.domain([
    d3.min(showreel.data, function(d) {
      return d.values[0].date;
    }),
    d3.max(showreel.data, function(d) {
      return d.values[d.values.length - 1].date;
    })
  ]);
**/
  showreel.xAxis.domain([dateRange.min, dateRange.max])

  showreel.x = d3.time.scale()
    .range([0, showreel.width - showreel.margin.right]);
  
  // Compute the minimum and maximum date across symbols. (for axis)
  
  showreel.x.domain([dateRange.min, dateRange.max])

  // console.log(dateRange.max)
  
  /*
  showreel.x.domain([
    d3.min(showreel.data, function(d) {
      return d.values[0].date;
    }),
    d3.max(showreel.data, function(d) {
      return d.values[d.values.length - 1].date;
    })
  ]);
  */

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

  var text_node = showreel.svg.append("svg:text");
  
  var extra = "";
  if (showreel.data[0].actualCount > 50)
    extra = "Top 50 of " + showreel.data[0].actualCount + " ";

  text_node.append("tspan")
    .attr("class", "svgTitle")
    //.text(extra + app.pick.get('dimension'))
    .text(extra + 'dimension')
    .attr("x", showreel.margin.left / 3)
    .attr("y", "-1.3em");

  text_node.append("tspan")
    .attr("class", "svgTitle2")
    // .text(app.pick.get('report'))
    .text('report')
    .attr("dx", "0.4em")
    .attr("dy", "0em");
  //
  var g = showreel.svg.selectAll("g")
    .data(showreel.data);

  g.enter()
    .append("g")
    .attr("class", "symbol");

  g.exit()
    .remove(); //when we change the data source, the elements should auto update

  showreel.resizeHelper();
}

export default initDimensions
