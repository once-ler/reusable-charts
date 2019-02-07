/* @flow */
import '../globals'

import {
  drawLines, drawHorizons
} from './draw'

import {
  createNavCells
} from './nav'

import {
  createGrid
} from './grid'

import {
  getReddit, getStatic
} from './grid/__test__'

import {
  getExecutionLog
} from './grid/remote'

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
  handleCloseButton,
  handleMouseOutGraph,
  handleNodeClick,
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
  triggerEvent,
  updateAbsoluteCoordinates,
  updateData,
  updateXDomain,
  vanish,
  zerosPad
} from './core';

const Showreel = {
  chartElementName: 'chart',
  data: [],
  cached: [], // Copy of initial data.  Do not mutate.  Used for updating showreel.data when slicing.
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
  currentChart: 'lines',
  userCurrentlyInteracting: false,
  currentUserPositionX: {},
  legendFontSize: 12,
  justKeys: [],
  firstLabel: true,
  monthsCovered: 24, // Total number of months in the date range, used to calculate ticks for xAxis
  absoluteCoordinates: {}, // Keeps track of g node absolute positions when window resizes 
  userClickedData: false, // Handle user click on data point.  If true, disable mousemove handling.
  
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

  createGrid() {
    return createGrid(this)()
  },

  createNavCells() {
    return createNavCells(this)()
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

  getExecutionLog(search) {
    getExecutionLog(this)(search)
  },

  getValueForPositionXFromData(xPosition, d) {
    return getValueForPositionXFromData(this)(xPosition, d)
  },

  handleCloseButton() {
    return handleCloseButton(this)
  },

  // Returns the function that will handle the mouseout event callback.
  handleMouseOutGraph() {
    return handleMouseOutGraph(this)
  },

  handleNodeClick() {
    return handleNodeClick(this)
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

  testGetReddit() {
    return getReddit(this)('dinosuars')
  },

  testGetStatic(search) {
    return getStatic(this)(search)
  },

  translateHelper(n) {
    return translateHelper(this)(n)  
  },

  translateHelperLabels() {
    return translateHelperLabels(this)()
  },

  triggerEvent(eventName) {
    return triggerEvent(this)(eventName)
  },

  updateAbsoluteCoordinates(targetWidth, targetHeight) {
    return updateAbsoluteCoordinates(this)(targetWidth, targetHeight)
  },

  updateData(data) {
    return updateData(this)(data)
  },

  updateXDomain() {
    return updateXDomain(this)()
  },

  vanish() {
    return vanish(this)()
  },

  zerosPad(rndVal, decPlaces) {
    return zerosPad(this)(rndVal, decPlaces)
  }

}

export default Showreel;
