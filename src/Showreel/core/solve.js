export const solve = showreel => form => {
  const response = {};

  const orignum = form.orignum;
  const secnum = form.secnum;
  
  response.difference = orignum - secnum;
  response.percentchange = Math.abs((response.difference / orignum) * 100);

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
