/* @flow */
export const triggerEvent = showreel => (eventName) => {
  const trigger = eventName || 'resize' 
  const evt = document.createEvent('UIEvents');
  evt.initUIEvent(eventName, true, false, window, 0);
  window.dispatchEvent(evt);
}

export default triggerEvent
