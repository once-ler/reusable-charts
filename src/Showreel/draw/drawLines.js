import { lines } from '../components'

export const drawLines = showreel => () => {
  showreel.vanish();
  showreel.switchXAxis(0, 1);
  showreel.translateHelper("lines")();

  const exec = lines(showreel)
  setTimeout(exec, showreel.duration / 2);
  showreel.redrawLabels();
}

export default drawLines
