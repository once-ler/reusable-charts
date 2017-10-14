import {
  createDateLabel,
  crosshair,
  displayValueLabelsForPositionX,
  drawBetterXAxis,
  getValueForPositionXFromData,
  handleMouseOutGraph,
  perRound,
  setXAxis,
  setYAxis,
  solve,
  summarize,
  switchXAxis,
  zerosPad
} from './utils';

$.showreel = $.showreel || {};
$.extend($.showreel, {
  chartElementName: 'chart',
  data: [],
  margin: {},
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

  sameColor(k) {
    return $.showreel.color(k);
  },

  darkerColor(k) {
    const c = d3.rgb($.showreel.color(k));
    return c.darker()
      .toString();
  },

  // A line generator, for the dark stroke.
  line: d3.svg.line()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y(function(d) {
      return this.y(d.price);
    }),

  // A line generator, for the dark stroke.
  axis: d3.svg.line()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y(this.height),

  // A area generator, for the dark stroke.
  area: d3.svg.area()
    .interpolate("monotone")
    .x(function(d) {
      return this.x(d.date);
    })
    .y0(this.height)
    .y1(function(d) {
      return this.y(d.price);
    }),

  format: d3.time.format("%Y"),
  format2: d3.time.format("%b %Y"),
  formatPercent: d3.format(".2f"),
  formatCurrency: d3.format(",.2f"),

  config(options) {
    if (!options)
      return;

    for (const k in options) {
      this[k] = options[k];
    }

    options.data &&
      (this.justKeys = _.map(this.data, d => d.key));

    options.color && (this.color = d3.scale.ordinal().range(options.color));
    options.color2 && (this.color2 = d3.scale.ordinal().range(options.color2));

    if (typeof options.margin === 'undefined') {
      this.margin = {
        top: 60,
        right: 30,
        bottom: 30,
        left: 30
      };
    }

    if (!$.showreel.resizeOnce) {
      $.showreel.initDimensions();
      $.showreel.drawBetterXAxis();
      $.showreel.hoverHelper();

      setTimeout(() => {
        $.showreel.resizeOnce = true;
        $(window).trigger('resize');
      }, 400);
    }
  },

  dispose() {
    $(window)
      .unbind("resize");
    $('a.delete')
      .unbind("click");
    //$('.remove1').unbind("click");
    $(`#${$.showreel.chartElementName}`)
      .unbind("mousemove mouseout");
    //$('#' + $.showreel.chartElementName).unbind("mouseout");

    if ($.showreel.svg != undefined) {
      $.showreel.svg.selectAll("*")
        .remove();
    }

    $.showreel.resizeOnce = false;
    $.showreel.rulesCreated = false;
    $.showreel.firstLabel = true;

    $(`#${$.showreel.chartElementName}`)
      .empty();
  },

  createDateLabel: createDateLabel(this),

  crosshair: crosshair(this),

  displayValueLabelsForPositionX: displayValueLabelsForPositionX(this),

  drawBetterXAxis: drawBetterXAxis(this),

  getValueForPositionXFromData: getValueForPositionXFromData(this),

  handleMouseOutGraph: handleMouseOutGraph(this),

  perRound: perRound(this),

  setXAxis: setXAxis(this),

  setYAxis: setYAxis(this),

  solve: solve(this),

  summarize: summarize(this),

  switchXAxis: switchXAxis(this),

  zerosPad: zerosPad(this)


});

export default $.showreel;
