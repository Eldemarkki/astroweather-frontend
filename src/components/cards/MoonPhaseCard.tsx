import { Text } from '@mantine/core'
import { WeatherCard } from './WeatherCard'
const SunCalc = require("suncalc");

export const MoonPhaseCard = () => {
  const moonPhase = SunCalc.getMoonIllumination(new Date());
  return (<WeatherCard title="Moon phase">
    <Text color="yellow">{(moonPhase.fraction * 100).toFixed(2)}% (Waxing Crescent)</Text>
  </WeatherCard>
  )
}
