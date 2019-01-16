/* @flow */
export const triggerWindowResize = showreel => () => {
  const evt = document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
}

export default triggerWindowResize
