export const solve = showreel => form => {
  const response = {};

  const orignum = form.orignum;
  const secnum = form.secnum;

  if (orignum - secnum == 0) {
    response.difference = "There is no change.";
  }

  /*
  if (orignum - secnum > 0) {
    response.difference = orignum - secnum;
    response.percentchange = Math.abs((response.difference / orignum) * 100);
  }

  if (orignum - secnum < 0) {
    response.difference = secnum - orignum;
    response.percentchange = Math.abs((response.difference / secnum) * 100);
  }
*/

  response.difference = secnum - orignum;
  response.percentchange = Math.abs((response.difference / secnum) * 100);

  if (orignum > secnum) {
    // " % decrease";
    response.direction = "-";
  }

  if (secnum > orignum) {
    // " % increase";
    response.direction = "+";
  }

  return response;
};
