/* @flow */
import fetch from 'unfetch'

const endpoint = '/log/agg'

export const getExecutionAggregationLog = showreel => (monthsElapsed = 60) => {
  // Initial progress.  This will be reconfigured in showreel.config().
  NProgress.configure({
    showSpinner: false,
    minimum: 0.40
  })
  
  const onDownloadComplete = (series) => {
    NProgress.done(true)
    
    if (!series || series.length === 0) return;
  
    series = series.map(function(d) { 
      d.date = new Date(d.date); 
      d.price = +d.price; return d; 
    });
    
    // Last 5 years
    const fromDate = moment().subtract(monthsElapsed, 'months').toDate()
  
    series = _.filter(series, d => (d.date > fromDate))
    
    const grouped = _.groupBy(series, function(d) { return d.symbol; });
  
    const data = _.map(grouped, function(v, k) {
      return {
        key: k,
        values: v,
        actualCount: v.length,
        isDate: true,
        keys: [],
        maxPrice: d3.max(v, function (d) { return d.price; }),
        sumPrice: d3.sum(v, function (d) { return d.price; }),
        maxDate: d3.max(v, function (d) { return d.date; }),
        minDate: d3.min(v, function (d) { return d.date; })
      }
    });
    
    const sorted = _.sortBy(data, d => d.sumPrice)

    return sorted;
  }

  const onDataPrepared = sorted => {
    showreel.config({
      data: sorted,
      chartElementName: 'chart1',
      color: colorbrewer2.Set2[7],
      color2: colorbrewer2.OrRd[3],
      width: 960,
      height: 1500,
      margin: { 
        top: 20,
        right: 30,
        bottom: 30,
        left: 65
      } 
    });
  
    showreel.drawLines()

    return true
  }
  
  NProgress.start()

  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(r => {
    if (!r.ok)
      throw new Error(r.statusText)
    return r.json()
  })
  .then(onDownloadComplete)
  .then(onDataPrepared)
  .catch( e => console.log(e))
}
