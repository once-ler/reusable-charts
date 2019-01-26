/* @flow */

export const createNavCells = showreel => () => {

  const navs = [
    {
      id: '0', 
      icon: 'ion-md-analytics', 
      content: function(showreel) {
        return `
          <select id="select-chart-type" class="select-css">
            <option value="lines">Lines</option>
            <option value="horizons">Horizons</option>
          </select>
        `
      },
      callback: function(showreel, close) {
        d3.select('#select-chart-type').on('change', function() {
          const val = d3.select(this).property('value')

          switch (val) {
            case 'horizons':
              showreel.drawHorizons()
              break
            case 'lines':
              showreel.drawLines()
              break  
            default:
              break
          }

          close()
          
        })
      }
    }, 
    {
      id: '1', 
      icon: 'ion-ios-keypad',
      content: function(showreel) {
        return `
        <form id="months-elapsed-form">
          <div class="form-cell">
          <input type="text" id="months-elapsed" name="months-elapsed" size="40" pattern="[0-9]{1,3}" placeholder="Months elapsed">
          </div>
        </form>
        `
      },
      callback: function(showreel, close) {
        d3.select("#months-elapsed-form").on('submit', function() {
          d3.event.preventDefault()
          close()
        })

        d3.select('#months-elapsed').on('change', function(){
          const val = d3.select(this).property('value')
       
          const data = showreel.data.slice(2,4)
          showreel.updateData(data)
          
          showreel.drawLines()          
          
        })
      }
    }
  ]

  const li = d3.select('#nav-list').selectAll('li').data(navs)
  
  li.enter().append('li').attr('class', 'item')
    .on('click', function(d1, i) {
        d3.event.stopPropagation()
        
        // console.log(d3.event.target.nodeName)
        if (~d3.event.target.nodeName.search(/(input|select|div)/i))
          return
        
        const d = d3.select(this)
        
        d.classed('rectangle', !d.classed('rectangle'))
        d.selectAll('span i').each(function(d, i){
          const ico = d3.select(this)
          ico.classed('not-visible', !ico.classed('not-visible'))
        })
        const content =d.select('.content') 
        content.classed('not-visible', !content.classed('not-visible'))
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
          item.append('div').attr('class', 'content not-visible')
            .html(html)          
        }

        const close = () => item.node().click()
        if (d.callback) {
          d.callback(showreel, close)
        }
            
    })

  li.exit().remove()

}
