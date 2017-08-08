/* @flow */

Number.prototype.roundTo = function(nTo) {
  nTo = nTo || 10;
  return Math.round(this * (1 / nTo)) * nTo;
};
Number.prototype.ceilTo = function(nTo) {
  nTo = nTo || 10;
  return Math.ceil(this * (1 / nTo)) * nTo;
};
Number.prototype.floorTo = function(nTo) {
  nTo = nTo || 10;
  return Math.floor(this * (1 / nTo)) * nTo;
};

export const createTooltip = () => {
  const tooltip = d3.select("#chart").append("div").attr('class', 'message anthracite-gradient t2tip').style("position", "absolute").style("z-index", "10").style("visibility", "hidden");
  const tooltipText = tooltip.append('div').attr('class', 't2tip').style('padding', '5px');
  const tooltipArrow = tooltip.append('span').attr('id','tooltip-arrow').attr('class', "block-arrow bottom t2tip").html('<span></span>');
};

export const log10 = val => Math.log(val) / Math.LN10;

export const closestRoundTo = (extentMax, tickCount) => {
  const tickWidth = extentMax / tickCount;
  const numZeros = Math.floor(log10(tickWidth));
  let roundTo = Math.pow(10, numZeros);
  roundTo = roundTo == 1 ? 10 : roundTo;
  const tickRound = (tickWidth).floorTo(roundTo);
  // tickRound = tickRound < 1 ? 200 : tickRound;
  return tickRound;
};

export const disposeSVGLayout = () => {
  d3.selectAll(".chart").selectAll("svg").remove();
  /*
  var svg = d3.select('#chart').selectAll('svg');
  if (svg != undefined && svg) {
      svg.selectAll("*").remove();
  }
  $('#chart').find('*').not('.t2tip').remove();
  */
};

export const cleanupLayout = () => {
  disposeSVGLayout();
};
