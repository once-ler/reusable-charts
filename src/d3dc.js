class d3dc {};

d3dc.initialHierarchy = () => initialHierarchy;

d3dc.availableDimensions = () => _.chain(availableDimensions)
  // .filter(d => d.name != "downtimeminutes")
  .map("name").value();

d3dc.barCharts = () => barCharts;
        
d3dc.bubbleCharts = () => bubbleCharts;

d3dc.lineCharts = () =>lineCharts;

d3dc.barChartDimensions = () => barChartDimensions;

d3dc.setupData = (jso, requestNonZeroOnly) => {
  if (srcdata) return;
  // If set to true, only non zero dimension group by value will be displayed.
  // Note however that zero value dimension group still need to be processed, 
  // the chart will just not display it.
  nonZeroOnly = requestNonZeroOnly;

  srcdata = jso;

  // pre-calculate month for better performance
  // But, we shouldn't know about faildate.
  srcdata.forEach(e => e.month = d3.time.month(e['faildate']));          
};

d3dc.updateChart = () => {
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
  setLineChartDimensions();
  setBarChartDimensions();
  setBubbleChartDimensions();

  //build the charts in this sequence
  const lines = buildLineCharts();
  const bars = buildBarCharts();
  buildDataCount();
  const bubbles = buildBubbleCharts();
};

export default d3dc;
