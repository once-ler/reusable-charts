### Example of prepping the data for consumption

```javascript
  series = series.map(d => { 
    d.date = new Date(d.date) 
    d.price = +d.price; return d 
  })
  
  var grouped = _.groupBy(series, d => d.symbol)

  var data = _.map(grouped, (v, k) => {
    return {
      key: k,
      values: v,
      actualCount: v.length,
      isDate: true,
      keys: [],
      maxPrice: d3.max(v, d => d.price),
      sumPrice: d3.sum(v, d => d.price),
      maxDate: d3.max(v, d => d.date),
      minDate: d3.min(v, d => d.date)
    }
  })
```
