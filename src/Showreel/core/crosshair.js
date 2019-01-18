export const crosshair = showreel => {
  return () => {
    d3.event.stopPropagation();

    // Do not allow crosshair to interact if the user has clicked on a data point.
    if (showreel.userClickedData) return;

    let x = d3.event.pageX - 7
    const y = d3.event.pageY - 23

    d3.select('#vertical').style('left', `${x}px`)

    d3.select('#pointer').style('left', `${x - 4}px`).style('top', `${y}px`)

    const sel = d3.select(`#${showreel.chartElementName} svg`).node()
    const box = sel.getBoundingClientRect()
    // const svgWidth = sel.getBBox().width // For svg element
    const svgWidth = box.width // For html element

    const diff = svgWidth / showreel.originalWidth;    
    const marginLeft = diff * showreel.margin.left;
    const marginRight = diff * (showreel.margin.right + 5); //pad just a little to coerce the crosshair to read accurately

    x = x - box.x + box.left    

    if (x < marginLeft)
      return false;

    x = ((x - marginLeft) / (svgWidth - marginLeft - marginRight)) * showreel.originalWidth;

    showreel.displayValueLabelsForPositionX(x);

    showreel.userCurrentlyInteracting = true;
  }
};
