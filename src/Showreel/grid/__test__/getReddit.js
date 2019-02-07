/* @flow */
const jsonp = require('jsonp')

export const getReddit = showreel => search => {

  const processCallback = (err, res) => {
    if (res.data.children.length === 0) {
      return;
    }

    process(res)
  }

  const process = res => {
    showreel.clusterize.clear()

    const dset = res.data.children.map((item, idx) => { 
      const {author_fullname, created, name, selftext, title} = item.data
      const da = {author_fullname, created, name, selftext, title}
      const row = [author_fullname, created, name, selftext, title]

      const b = row.reduce((m, d, i) => {
        let w
        switch (i) {
          case 3:
          case 4:
            w = '40%'
            break
          default:
            w = '10%'
            break
        }
        m += `<td style="width:${w};">${d}</td>`
        return m;
      }, '')
      
      return `<tr><td style="width: 60px;">${idx}</td>${b}</tr>`
    })

    const dh = res.data.children[0].data
    const {author_fullname, created, name, selftext, title} = dh
      
    const head = {author_fullname, created, name, selftext, title}
    const h = Object.keys(head).reduce((m, d, i) => {
      let w
        switch (i) {
          case 3:
          case 4:
            w = '40%'
            break
          default:
            w = '10%'
            break
        }
        m += `<th style="width:${w};">${d.toUpperCase()}</th>`
        return m;
    }, '')

    const th = document.querySelector('.clusterize table thead tr')
    th.innerHTML = `<th style="60px;">ROW</th>${h}`

    showreel.clusterize.update(dset)
    setTimeout(() => NProgress.done(), 200)
  }

  const endpoint = "https://www.reddit.com/search.json?restrict_sr=1&limit=10&jsonp=callback&q="
  // let search = 'cats'

  const fetchReddit = search => {
    NProgress.start()
    const url_ = endpoint + search;

    jsonp(url_, {param : 'jsonp'}, processCallback)
  }

  fetchReddit(search)

}
