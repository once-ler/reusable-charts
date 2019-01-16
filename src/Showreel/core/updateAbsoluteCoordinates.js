export const updateAbsoluteCoordinates = showreel => (targetWidth, targetHeight) => {
  showreel.absoluteCoordinates.ROOT = {width: targetWidth, height: targetHeight}

  const g1 = showreel.svg.selectAll(".symbol");

  g1.each(function(e, ei) {
    const g = d3.select(this);
    const box = g.node().getBoundingClientRect()    
    showreel.absoluteCoordinates[e.key] = box
  })
}

export default updateAbsoluteCoordinates;
