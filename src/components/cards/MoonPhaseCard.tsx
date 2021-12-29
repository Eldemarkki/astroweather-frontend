import { Text } from '@mantine/core';
import { greenRed } from '../../utils/gradients';
import { WeatherCard } from './WeatherCard'
const SunCalc = require("suncalc");

export const MoonPhaseCard = () => {
  const moonPhase = SunCalc.getMoonIllumination(new Date());

  const color = greenRed(moonPhase.fraction);
  return (<WeatherCard title="Moon phase">
    <Text sx={{ color }}>{(moonPhase.fraction * 100).toFixed(2)}% (Waxing Crescent)</Text>
  </WeatherCard>
  )
}
