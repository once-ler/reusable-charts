/* @flow */
export const dispose = showreel => () => {
  $(window)
    .unbind("resize");
  $('a.delete')
    .unbind("click");
  //$('.remove1').unbind("click");
  $(`#${Showreel.chartElementName}`)
    .unbind("mousemove mouseout");
  //$('#' + Showreel.chartElementName).unbind("mouseout");

  if (showreel.svg != undefined) {
    showreel.svg.selectAll("*")
      .remove();
  }

  showreel.resizeOnce = false;
  showreel.rulesCreated = false;
  showreel.firstLabel = true;

  $(`#${showreel.chartElementName}`)
    .empty();
}

export default dispose
