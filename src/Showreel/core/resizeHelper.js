/* @flow */
export const resizeHelper = showreel => () => {
  d3.select(window).on('resize', null);
  
  const resize = () => {
    d3.event.stopPropagation();
    
    const sel = d3.select(`#${showreel.chartElementName} svg`)
    const chart = sel.node()
    const container = chart.parentNode
    const box = chart.getBoundingClientRect()
    const boxParent = container.getBoundingClientRect() 

    const aspect = box.width / box.height;
    const targetWidth = boxParent.width;

    sel.attr("width", targetWidth);
    sel.attr("height", Math.round(targetWidth / aspect) + showreel.margin.bottom);

    d3.select('#vertical').style('left', `${boxParent.x}px`)
  }  

  d3.select(window).on('resize', resize);

  showreel.triggerWindowResize()
}

export default resizeHelper
