/* @flow */
global.$ = require('jquery')

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

const Showreel = {
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
    return this.color(k);
  },

  darkerColor(k) {
    const c = d3.rgb(this.color(k));
    return c.darker()
      .toString();
  },

  // A line generator, for the dark stroke.
  line() { 
    return d3.svg.line()
      .interpolate("monotone")
      .x(function(d) {
        return this.x(d.date);
      })
      .y(function(d) {
        return this.y(d.price);
      })
  },

  // A line generator, for the dark stroke.
  axis() { 
    return d3.svg.line()
      .interpolate("monotone")
      .x(function(d) {
        return this.x(d.date);
      })
      .y(this.height)
  },

  // A area generator, for the dark stroke.
  area() {    
    return d3.svg.area()
      .interpolate("monotone")
      .x(function(d) {
        return Showreel.x(d.date);
      })
      .y0(Showreel.height)
      .y1(function(d) {
        return Showreel.y(d.price);
      })
  },

  format() {
    return d3.time.format("%Y")
  },
  format2() {
    return d3.time.format("%b %Y")
  },
  formatPercent() {
    return d3.format(".2f")
  },
  formatCurrency() {
    return d3.format(",.2f")
  },

  hoverHelper: function() {
    $('#' + this.chartElementName)
      .bind({
        mousemove: crosshair,
        mouseout: handleMouseOutGraph
      });

    this.createDateLabel();

    setTimeout(function() {
      this.displayValueLabelsForPositionX(this.width - this.margin.left - this.margin.right + 20);
    }, 300);
  },

// ----
  initDimensions: function(_height) {
    this.width = this.width - this.margin.right - this.margin.left;
    this.originalWidth = this.width;
    this.gHeight = this.data.length == 1 ? 180 : (this.data.length == 2 ? 105 : 65);
    this.height = (this.gHeight) * this.data.length;
    this.x = d3.time.scale()
      .range([0, this.width - this.margin.right]);
    this.y = d3.scale.linear()
      .range([this.gHeight, 0]);
    
    this.xAxis = d3.time.scale()
      .range([0, this.width - this.margin.right]); //used by mousemove
    this.xAxis.domain([
      d3.min(this.data, function(d) {
        return d.values[0].date;
      }),
      d3.max(this.data, function(d) {
        return d.values[d.values.length - 1].date;
      })
    ]);

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .ticks(4)
      .orient("right");

    // Compute the minimum and maximum date across symbols. (for axis)
    this.x.domain([
      d3.min(this.data, function(d) {
        return d.values[0].date;
      }),
      d3.max(this.data, function(d) {
        return d.values[d.values.length - 1].date;
      })
    ]);

    $('#contentcolumn')
      .width($('#contentcolumn') + 'px');

    this.svgWidth = this.width + this.margin.right + this.margin.left;
    //this.svgHeight = this.height + this.margin.top + this.margin.bottom;
    this.svgHeight = (85 * 4) + this.margin.top + this.margin.bottom;

    this.svg = d3.select('#' + this.chartElementName)
      .append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight)
      .attr("viewBox", "0 0 " + this.svgWidth + " " + this.svgHeight)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("class", "gmain")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    var text_node = this.svg.append("svg:text");
    
    var extra = "";
    if (this.data[0].actualCount > 50)
      extra = "Top 50 of " + this.data[0].actualCount + " ";

    text_node.append("tspan")
      .attr("class", "svgTitle")
      //.text(extra + app.pick.get('dimension'))
      .text(extra + 'dimension')
      .attr("x", this.margin.left / 3)
      .attr("y", "-1.3em");

    text_node.append("tspan")
      .attr("class", "svgTitle2")
      // .text(app.pick.get('report'))
      .text('report')
      .attr("dx", "0.4em")
      .attr("dy", "0em");
    //
    var g = this.svg.selectAll("g")
      .data(this.data);

    g.enter()
      .append("g")
      .attr("class", "symbol");

    g.exit()
      .remove(); //when we change the data source, the elements should auto update

    this.resizeHelper();
  },
  resizeHelper: function() {
    $(window)
      .unbind("resize");

    var chart = $("#" + this.chartElementName + " svg");
    var aspect = chart.width() / chart.height(),
      container = chart.parent();

    $(window)
      .bind({
        resize: function(event) {
          event.stopPropagation();
          var targetWidth = container.width(); // -$("#sidebar-right").width() - substractLeft;
          chart.attr("width", targetWidth);
          chart.attr("height", Math.round(targetWidth / aspect));
        }
      });

    $(window)
      .trigger('resize');
  },
  translateHelper: function(n) {
    if (n == "bars" || n == "lines" || n == "horizons" || n == "areas") {

      return function() {

        var t = this.svg.selectAll(".symbol")
          .transition()
          .duration(this.duration / 2);
        t.selectAll('text.date-label')
          .attr("opacity", 0);

        t.each(function(d, i) {
          var tln = d3.select(this)
            .attr("transform");
          
          d3.select(this)
            .transition()
            .duration(this.duration / 2)
            .attr("transform", "translate(0," + ((i * this.gHeight) + (i * 30)) + ")");
        });
      }
    }

    return function() {
      var t = this.svg.selectAll(".symbol")
        .transition()
        .duration(this.duration / 2);
      
      t.selectAll('text.date-label')
        .attr("opacity", 0);
      t.attr("transform", "translate(0,0)");
    }

  },
  translateHelperLabels: function() {
    if (this.currentChart == "bars" || this.currentChart == "lines" || this.currentChart == "horizons" || this.currentChart == "areas") {
      return function() {
        var t = this.svg.selectAll(".symbol")
          .transition()
          .duration(this.duration / 2);
        t.selectAll('text.date-label')
          .attr("opacity", 1);

        t.each(function(d, i) {

          //just want one date to diaplay
          var e = d3.select(this)
            .selectAll('text.date-label tspan.tspan-0');
          e.each(function(f, j) {
            if (i > 0)
              d3.select(this)
              .transition()
              .duration(this.duration / 2)
              .attr("fill-opacity", 1);
          });

          d3.select(this)
            .selectAll('text.date-label')
            .transition()
            .duration(this.duration / 2)
            .attr("y", this.currentChart == "horizons" ? 20 : 10);

        });

        if (this.currentChart == "horizons") {
          this.moveXAxisLabels(0, -15);
        } else {
          this.moveXAxisLabels(0, 0);
        }

      };
    } else {
      return function() {
        var t = this.svg.selectAll(".symbol")
          .transition()
          .duration(this.duration / 2);

        t.selectAll('text.date-label')
          .attr("opacity", 1);

        t.each(function(d, i) {
          //just want one date to diaplay
          if (d.isDate) {
            var e = d3.select(this)
              .selectAll('text.date-label tspan.tspan-0');
            e.each(function(f, j) {
              if (i > 0)
                d3.select(this)
                .transition()
                .duration(this.duration / 2)
                .attr("fill-opacity", 0);
            });
          }

          d3.select(this)
            .selectAll('text.date-label')
            .transition()
            .duration(this.duration / 2)
            .attr("y", (i * (this.gHeight / 2)) + (i * 5));

        });

        if (this.currentChart == "horizons") {
          this.moveXAxisLabels(0, -15);
        } else {
          this.moveXAxisLabels(0, 0);
        }

      };
    }
  },

  hoverHelper: function() {
    $('#' + this.chartElementName)
      .bind({
        mousemove: this.crosshair,
        mouseout: this.handleMouseOutGraph
      });

    this.createDateLabel();

    setTimeout(function() {
      this.displayValueLabelsForPositionX(this.width - this.margin.left - this.margin.right + 20);
    }, 300);
  },
//----
  config(options) {
    if (!options)
      return;

    for (const k in options) {
      Showreel[k] = options[k];
    }

    options.data &&
      (this.justKeys = _.map(Showreel.data, d => d.key));

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

    if (!this.resizeOnce) {
      this.initDimensions();
      drawBetterXAxis();
      this.hoverHelper();

      setTimeout(() => {
        this.resizeOnce = true;
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
    $(`#${Showreel.chartElementName}`)
      .unbind("mousemove mouseout");
    //$('#' + Showreel.chartElementName).unbind("mouseout");

    if (this.svg != undefined) {
      this.svg.selectAll("*")
        .remove();
    }

    this.resizeOnce = false;
    this.rulesCreated = false;
    this.firstLabel = true;

    $(`#${this.chartElementName}`)
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

}

export default Showreel;