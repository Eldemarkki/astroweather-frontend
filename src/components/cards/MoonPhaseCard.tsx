import { greenRed } from '../../utils/gradients';
import { WeatherCard } from './WeatherCard'
const SunCalc = require("suncalc");

export const MoonPhaseCard = () => {
  const moonPhase = SunCalc.getMoonIllumination(new Date());

  const color = greenRed(moonPhase.fraction);
  return (<WeatherCard title="Moon phase">
    <span style={{ color }}>{(moonPhase.fraction * 100).toFixed(2)}% (Waxing Crescent)</span>
  </WeatherCard>
  )
}
