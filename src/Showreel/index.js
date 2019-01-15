/* @flow */
import {
  drawLines, drawHorizons
} from './draw'

import {
  area,
  axis,
  config,
  createDateLabel,
  crosshair,
  dispose,
  displayValueLabelsForPositionX,
  drawBetterXAxis,
  getValueForPositionXFromData,
  handleMouseOutGraph,
  hoverHelper,
  initDimensions,
  line,
  moveXAxisLabels,
  perRound,
  redrawLabels,
  resizeHelper,
  setXAxis,
  setYAxis,
  solve,
  summarize,
  switchXAxis,
  translateHelper,
  translateHelperLabels,
  triggerWindowResize,
  vanish,
  zerosPad
} from './core';

const Showreel = {
  chartElementName: 'chart',
  data: [],
  margin: {
    left: 5,
    right: 5
  },
  originalWidth: 0,
  width: 960,
  height: 500,
  gHeight: 105,
  x: {},
  y: {},
  duration: 1100,
  delay: 400,
  color: d3.scale.category10(),
  color2: d3.scale.category10(),
  svg: undefined,
  xAxis: {},
  yAxis: {},
  svgWidth: 0,
  svgheight: 0,
  resizeOnce: false,
  rulesCreated: false,
  currentChart: 'bars',
  userCurrentlyInteracting: false,
  currentUserPositionX: {},
  legendFontSize: 12,
  justKeys: [],
  firstLabel: true,
  monthsCovered: 24, // Total number of months in the date range, used to calculate ticks for xAxis

  // An axis generator, for the dark stroke.
  axis() { 
    return axis(this)()
  },

  // An area generator, for the dark stroke.
  area() {    
    return area(this)()
  },
  
  config(options) {
    return config(this)(options)
  },

  createDateLabel() {
    return createDateLabel(this)()
  },

  // Returns the function that will handle the mousemove event callback.
  crosshair() {
    return crosshair(this)
  },

  darkerColor(k) {
    const c = d3.rgb(this.color(k));
    return c.darker()
      .toString();
  },

  displayValueLabelsForPositionX(xPosition) {
    return displayValueLabelsForPositionX(this)(xPosition)
  },

  dispose() {
    return dispose(this)()
  },  

  drawBetterXAxis() {
    return drawBetterXAxis(this)()
  },

  drawHorizons() {
    return drawHorizons(this)()
  },

  drawLines() {
    return drawLines(this)()
  },

  format: d3.time.format("%Y"),

  format2: d3.time.format("%b %Y"),

  format3: d3.time.format("%b %_d %Y"),

  formatPercent: d3.format(".2f"),

  formatCurrency: d3.format(",.2f"),

  getValueForPositionXFromData(xPosition, d) {
    return getValueForPositionXFromData(this)(xPosition, d)
  },

  // Returns the function that will handle the mouseout event callback.
  handleMouseOutGraph() {
    return handleMouseOutGraph(this)
  },

  hoverHelper() {
    return hoverHelper(this)()
  },

  initDimensions(){
    return initDimensions(this)()
  },

  // A line generator, for the dark stroke.
  line() { 
    return line(this)()
  },

  moveXAxisLabels(x, y) {
    return moveXAxisLabels(this)(x, y)
  },
  
  perRound(num, precision) {
    return perRound(this)(num, precision)
  },

  redrawLabels() {
    return redrawLabels(this)()
  },

  resizeHelper() {
    return resizeHelper(this)()
  },

  sameColor(k) {
    return this.color(k);
  },
  
  setXAxis(g, h, i, o) {
    return setXAxis(this)(g, h, i, o)
  },

  setYAxis() {
    return setYAxis(this)()
  },

  solve(form) {
    return solve(this)(form)
  },

  summarize() {
    return summarize(this)()
  },

  switchXAxis() {
    return switchXAxis(this)()
  },

  translateHelper(n) {
    return translateHelper(this)(n)  
  },

  translateHelperLabels() {
    return translateHelperLabels(this)()
  },

  triggerWindowResize() {
    return triggerWindowResize(this)()
  },

  vanish() {
    return vanish(this)
  },

  zerosPad(rndVal, decPlaces) {
    return zerosPad(this)(rndVal, decPlaces)
  }

}

export default Showreel;
