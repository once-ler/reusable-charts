export const drawBetterXAxis = showreel => () => {

const g = showreel.svg.selectAll("g.symbol");
  const g2 = showreel.svg;
  showreel.setXAxis(g, showreel.gHeight, 0, 1);
  showreel.setXAxis(g2, showreel.height, 1, 0);
  showreel.setYAxis();

  showreel.rulesCreated = true;
};
