export const crosshair = showreel => {
  return event => {
    event.stopPropagation();

    let x = event.pageX - $(window)
      .scrollLeft();
    $('#vertical')
      .css('left', `${x}px`);

    const diff = $(`#${showreel.chartElementName} svg`)
      .width() / showreel.originalWidth;
    const marginLeft = diff * showreel.margin.left;
    const marginRight = diff * (showreel.margin.right + 5); //pad just a little to coerce the crosshair to read accurately

    x = x - $("#" + showreel.chartElementName)
      .offset()
      .left + $(window)
      .scrollLeft();

    if (x < marginLeft)
      return false;

    x = ((x - marginLeft) / ($(`#${showreel.chartElementName} svg`)
      .width() - marginLeft - marginRight)) * showreel.originalWidth;

    showreel.displayValueLabelsForPositionX(x);

    showreel.userCurrentlyInteracting = true;
  }
};
