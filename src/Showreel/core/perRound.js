export const perRound = showreel => (num, precision_) => {
  let precision = precision_ || 2;
  // default value if not passed from caller, change if desired
  // remark if passed from caller
  precision = parseInt(precision); // make certain the decimal precision is an integer
  const result1 = num * (10 * precision);
  const result2 = Math.round(result1);
  const result3 = result2 / (10 * precision);
  return showreel.zerosPad(result3, precision);
};

export default perRound
