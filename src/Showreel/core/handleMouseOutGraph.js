export const handleMouseOutGraph = showreel => () => {
  d3.event.stopPropagation()
  // user is no longer interacting
  showreel.userCurrentlyInteracting = false;
};
