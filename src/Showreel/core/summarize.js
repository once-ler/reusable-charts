export const summarize = showreel => () => {
  $('#summary1')
    .empty();

  // get last 5 items of series
  const last5 = _.map(this.data, d => {
    const start = d.values.length < 5 ? 0 : -5;
    return {
      key: d.key,
      values: d.values.slice(start),
      maxPrice: d.maxPrice
    };
  });

  // compare first and last rec, that's <=1 year diff
  const diff1 = _.map(last5, d => {
    const retval = {
      key: d.key,
      values: d.values,
      maxPrice: d.maxPrice,
      pctChg: "0%"
    };
    let val = "0%";
    if (d.values.length > 0) {
      const fl = [_.first(d.values), _.last(d.values)];
      retval.values = fl;
      const form = {
        orignum: fl[0].y,
        secnum: fl[1].y
      };

      val = showreel.solve(form);
      retval.pctChg = `${val.direction + showreel.perRound(val.percentchange)}%`;
    } else {
      retval.values = [{
        y: 0
      }, {
        y: 0
      }];
    }
    return retval;
  });

  // summary
  const summary = _.map(diff1, d => `<li class="clear chead"><div class="c0">${d.key}</div><div class="c1">${showreel.formatCurrency(d.values[1].y)}</div><div class="c2">${showreel.formatCurrency(d.values[0].y)}</div><div class="c3">${d.pctChg}</div></li>`);

  let str = _.reduce(summary, (memo, num) => memo + num, '');
  const fc = _.first(diff1);
  str = `<li class="clear"><div class="c0"></div><div class="c1">${showreel.format2(fc.values[1].date)}</div><div class="c2">${showreel.format2(fc.values[0].date)}</div><div class="c3">% chg</div></li>${str}`
  $(str)
    .appendTo($('#summary1'));

  //color
  setTimeout(() => {
    d3.selectAll('#summary1 li div.c0')
      .each(function(d) {
        d3.select(this)
          .style("color", showreel.darkerColor(d3.select(this)
            .text()));
      });
  }, 300);
};
