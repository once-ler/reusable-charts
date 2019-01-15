/* @flow */
export const triggerWindowResize = showreel => () => {
  console.log('trigger')
  const evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
}

export default triggerWindowResize
