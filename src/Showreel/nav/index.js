/* @flow */

export const createNavCells = showreel => () => {

  const navs = [{id: '0', icon: 'ion-md-analytics', callback: function() { console.log('0')}}, {id: '1', icon: 'ion-ios-keypad'}]
  d3.select('#nav-list').selectAll('li').data(navs).enter().append('li')
    .each(function(d, i) {
      d3.select(this).append('span').attr('class', 'item size-24')
        .each(function(d, i) {
          d3.select(this).append('i').attr('class', d.icon + ' lightcoral-color')
          if (d.callback)
            d.callback()
        })
    })

  
/*
  <li id="menu-0" name="switch-chart" class="item size-24">
              <span class="menu-item size-24">
                <i class="ion-md-analytics lightcoral-color"></i>
              </span>
            </li>
*/
}
