/* @flow */
export const config = showreel => (options) => {
  if (!options)
    return;

  for (const k in options) {
    showreel[k] = options[k];
  }

  // Cached the data so user can slice and dice.
  showreel.cached = showreel.data.slice()

  options.data &&
    (showreel.justKeys = _.map(showreel.data, d => d.key));

  options.color && (showreel.color = d3.scale.ordinal().range(options.color));
  options.color2 && (showreel.color2 = d3.scale.ordinal().range(options.color2));

  if (typeof options.margin === 'undefined') {
    showreel.margin = {
      top: 60,
      right: 30,
      bottom: 30,
      left: 30
    };
  }

  if (!showreel.resizeOnce) {
    showreel.initDimensions();
    showreel.drawBetterXAxis();
    showreel.hoverHelper();
    showreel.createNavCells();
    showreel.createGrid();

    setTimeout(() => {
      showreel.resizeOnce = true;
      showreel.triggerEvent('resize');
    }, 400);
  }
}

export default config
