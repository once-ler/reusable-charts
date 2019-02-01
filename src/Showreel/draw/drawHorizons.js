import { horizons } from '../components'

export const drawHorizons = showreel => () => {
  showreel.currentChart = 'horizons'
  showreel.vanish()
  showreel.switchXAxis(0, 1)
  showreel.translateHelper("horizons")()

  const exec = horizons(showreel)
  setTimeout(exec, showreel.duration / 2);

  showreel.redrawLabels();
}

export default drawHorizons
