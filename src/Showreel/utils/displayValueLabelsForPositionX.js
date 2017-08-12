export const displayValueLabelsForPositionX = showreel => xPosition => {
  const g1 = $.showreel.svg.selectAll(".symbol");

  g1.each(function(e, ei) {
    let dateToShow;
    const g = d3.select(this);

    g.select("text.date-label tspan.tlegend-value")
      .text((d, i) => {
        const valuesForX = $.showreel.getValueForPositionXFromData(xPosition, d);
        dateToShow = d.isDate ? valuesForX.date : d.keys[valuesForX.date];
        let response;

        if (isNaN(valuesForX.value))
          return "";

        response = $.showreel.formatCurrency(valuesForX.value)
          .replace(/\.00/g, "");
        return response;
      });

    try {
      g.select('text.date-label tspan.tspan-0')
        .text(d => d.isDate ? $.showreel.format2(dateToShow) : dateToShow);

      g.select('text.date-label tspan.tspan-2')
        .text((d, i) => {
          if (ei == 0)
            return `compared to ${$.showreel.data[1].key}`;

          return `compared to ${$.showreel.data[0].key}`;
        });
    } catch (err) {

    }
  });

  //stub
  d3.select('text.date-label tspan.tspan-1')
    .text(" ");

  g1.each(function(e, ei) {
    const g = d3.select(this);
    //
    try {
      g.select('text.date-label tspan.tspan-1')
        .text((d, i) => {
          const form = {};
          form.orignum = $.showreel.currentUserPositionX[$.showreel.justKeys[ei == 0 ? 1 : 0]].price;
          form.secnum = $.showreel.currentUserPositionX[d.key].price;
          
          const val = $.showreel.solve(form);

          return `${val.direction + $.showreel.perRound(val.percentchange)}%`;
        });

    } catch (err) {

    }
  });
};
