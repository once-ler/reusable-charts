export const getValueForPositionXFromData = showreel => (xPosition, d) => {
  const xValue = showreel.xAxis.invert(xPosition);
  
  let found;

  if (xValue > 0) {
    
    d.values.every(e => {
      const test = e.date.getMonth() === xValue.getMonth() && e.date.getYear() == xValue.getYear();
      if (test) found = e
      return !test;
    });
  } else {
    found = d.values[0];
  }

  if (typeof found === 'undefined') {
    return {}
  }
  showreel.currentUserPositionX[d.key] = found;
  
  return {
    value: Math.round(found.yval || found.price),
    date: found.date,
    estimatedDate: xValue
  };
};
