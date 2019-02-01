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
    
    const aspect = box.width / box.height;
    const pad = 1/ aspect // showreel.margin.bottom * 0.5;

    const targetWidth = boxParent.width - pad;
    const targetHeight = Math.round(targetWidth / aspect) + pad;
  
    if (!isNaN(targetWidth) && !isNaN(targetHeight)) {
      sel.attr("width", targetWidth);
      sel.attr("height", targetHeight);

      // Keep track of all resized g elements
      showreel.updateAbsoluteCoordinates(targetWidth, targetHeight);
    }

    // Place the crosshair on the farthest left.
    d3.select('#vertical').style('left', '0px')
  }  

  d3.select(window).on('resize', resize);

  showreel.triggerEvent('resize')
}

export default resizeHelper
