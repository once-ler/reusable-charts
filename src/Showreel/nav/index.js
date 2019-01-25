/* @flow */

export const createNavCells = showreel => () => {

  const navs = [
    {
      id: '0', 
      icon: 'ion-md-analytics', 
      onClick: function(d, i) {
        // console.log(d.classed('rectangle'))
        // console.log(d.data())
        d.classed('rectangle', !d.classed('rectangle'))
        d.selectAll('span i').each(function(d, i){
          const ico = d3.select(this)
          ico.classed('not-visible', !ico.classed('not-visible'))
        })
        const content =d.select('.content') 
        content.classed('not-visible', !content.classed('not-visible'))
      },
      content: function(showreel) {
        return `
          <select class="select-css">
            <option value="lines">Lines</option>
            <option value="horizons">Horizons</option>
          </select>
        `
      }
    }, 
    {id: '1', icon: 'ion-ios-keypad'}
  ]

  const li = d3.select('#nav-list').selectAll('li').data(navs)
  
  li.enter().append('li').attr('class', 'item')
    .on('click', function(d, i) {
        d3.event.stopPropagation()

        if (d.onClick)
          return d.onClick(d3.select(this), i)
        
        console.log('No callback for ' + d.id)
      }
    )
    .each(function(d, i) {
      const icons = [{name: 'i0', className: d.icon}, {name: 'i1', className: 'ion-ios-close not-visible'}]
      const item = d3.select(this)
      item.append('span')
        .attr('class', 'size-24 lightcoral-color')
        .append('i').attr('name', icons[0].name).attr('class', icons[0].className)
      item.append('span')
        .attr('class', 'size-32 lightcoral-color')
        .append('i').attr('name', icons[1].name).attr('class', icons[1].className)

        if (d.content) {
          const html = d.content(showreel)
          item.append('div')
            .html(`<div class="content not-visible">${html}</div>`)          
        }
            
    })

  li.exit().remove()

}
