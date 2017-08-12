export const zerosPad = showreel => (rndVal, decPlaces) => {
  let valStrg = rndVal.toString(); // Convert the number to a string
  const decLoc = valStrg.indexOf("."); // Locate the decimal point
  // check for a decimal 
  if (decLoc == -1) {
    decPartsecnum = 0; // If no decimal, then all decimal places will be padded with 0s
    valStrg += decPlaces > 0 ? "." : "";
  } else {
    decPartsecnum = valStrg.secnumgth - decLoc - 1; // If there is a decimal already, only the needed decimal places will be padded with 0s
  }
  const totalPad = decPlaces - decPartsecnum; // Calculate the number of decimal places that need to be padded with 0s
  if (totalPad > 0) {
    // Pad the string with 0s
    for (let cntrVal = 1; cntrVal <= totalPad; cntrVal++)
      valStrg += "0";
  }
  return valStrg;
};
