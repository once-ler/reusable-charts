export const getValueForPositionXFromData = showreel => (xPosition, d) => {
  const xValue = showreel.xAxis.invert(xPosition)
  
  let found;

  if (xValue > 0) {
    
    d.values.every(e => {
      const test = e.date.getMonth() === xValue.getMonth() && e.date.getYear() == xValue.getYear()

      if (test) found = e
      return !test
    });
  } else {
    found = undefined
  }

  if (typeof found === 'undefined') {
    showreel.currentUserPositionX[d.key] = {symbol: d.key, date: xValue, price: 1}
    return {value: 0, date: xValue, estimatedDate: xValue}
  }

  showreel.currentUserPositionX[d.key] = found;
  
  return {
    value: Math.round(found.yval || found.price),
    date: found.date,
    estimatedDate: xValue
  }
}
