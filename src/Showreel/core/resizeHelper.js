/* @flow */
export const resizeHelper = showreel => () => {
  d3.select(window).on('resize', null);
  
  const resize = () => {
    d3.event.stopPropagation();
    
    const sel = d3.select(`#${showreel.chartElementName} svg`)
    const chart = sel.node()
    const container = chart.parentNode
    // const box = chart.getBoundingClientRect()
    const box = chart.getBBox()    
    const boxParent = container.getBoundingClientRect() 
    const pad = showreel.margin.bottom * 0.5;

    const aspect = box.width / box.height;
    const targetWidth = boxParent.width - pad;
    const targetHeight = Math.round(targetWidth / aspect) + pad;

    sel.attr("width", targetWidth);
    sel.attr("height", targetHeight);

    d3.select('#vertical').style('left', `${boxParent.x}px`)

    // Keep track of all resized g elements
    showreel.updateAbsoluteCoordinates(targetWidth, targetHeight);
  }  

  d3.select(window).on('resize', resize);

  showreel.triggerWindowResize()
}

export default resizeHelper
