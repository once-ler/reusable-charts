/* @flow */
import fetch from 'unfetch'

export const getExecutionLog = showreel => search => {

  const process = res => {
    if (!res || res.length === 0) {
      NProgress.done(true)
      d3.select('.clusterize-no-data td').node().innerText = 'NO DATA AVAILABLE'
      return;
    }

    const dset = res.map((item, idx) => { 
      const {StartTime, FromStore, ToStore, StudyId, WSI, Caller, Response} = item
      const da = {StartTime, FromStore, ToStore, StudyId, WSI, Caller, Response}
      const row = [StartTime, FromStore, ToStore, StudyId, WSI, Caller, Response]

      const b = row.reduce((m, d, i) => {
        let w = '10%', d1 = d
        switch (i) {
          case 0:
            d1 = d.slice(0, 19).replace('T', '<br/>')
            break
          case 6:
            w = '35%'
            break
          default:
            break
        }
        m += `<td style="width:${w};">${i == 6 ? '<pre>'+ d1 +'</pre>' : d1}</td>`
        return m;
      }, '')
      
      return `<tr><td style="width: 5%;">${idx}</td>${b}</tr>`
    })

    // const dh = res[0]
    // const {StartTime, FromStore, ToStore, StudyId, WSI, Caller, Response} = dh
      
    // const head = {StartTime, FromStore, ToStore, StudyId, WSI, Caller, Response}
    // const h = Object.keys(head).reduce((m, d, i) => {
    
    let headers = ["Time", "From", "To", "Study", "WSI", "App", "Response"]
    const h = headers.reduce((m, d, i) => { 
      let w
        switch (i) {
          case 6:
            w = '35%'
            break
          default:
            w = '10%'
            break
        }
        m += `<th style="width:${w};">${d.toUpperCase()}</th>`
        return m;
    }, '')

    const th = document.querySelector('.clusterize table thead tr')
    th.innerHTML = `<th style="width=5%;"></th>${h}`

    showreel.clusterize.update(dset)
    setTimeout(() => NProgress.done(), 200)
  }

  // const endpoint = '/log/wsi'
  const endpoint = 'test-downstream.json'
  
  const fetchExecutionLog = search => {
    showreel.clusterize.clear()
    NProgress.start()
    /*
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(search)
    })
    */
    fetch('test-downstream.json')
    .then(r => {
      if (!r.ok)
        throw new Error(r.statusText)
      return r.json()
    }).then(d => {
      process(d)
    }).catch( e => console.log(e))
  }

  fetchExecutionLog(search)

}
