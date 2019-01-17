export const handleMouseOutGraph = showreel => () => {
  d3.event.stopPropagation()
  
  showreel.userCurrentlyInteracting = false;
};
