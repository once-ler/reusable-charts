export const getValueForPositionXFromData = showreel => (xPosition, d) => {
  const xValue = $.showreel.xAxis.invert(xPosition);
  let found = undefined;

  if (xValue > 0) {
    _.all(d.values, e => {
      const test = e.date > xValue;
      if (test) found = e;
      return !test;
    });
  } else {
    found = d.values[0];
  }

  if (found != undefined) {
    $.showreel.currentUserPositionX[d.key] = found;
  }

  return {
    value: Math.round($.showreel.currentUserPositionX[d.key].yval),
    date: $.showreel.currentUserPositionX[d.key].date
  };
};
