import { Center, Text } from '@mantine/core';
import { greenRed } from '../../utils/gradients';
import { FunctionDiagram } from '../FunctionDiagram';
import { CardProps } from './CardProps';
import { WeatherCard } from './WeatherCard'
const SunCalc = require("suncalc");

export const MoonPhaseCard = ({ location }: CardProps) => {
  const moonPhase = SunCalc.getMoonIllumination(new Date());
  const moontimes = SunCalc.getMoonTimes(new Date(), location.latitude, location.longitude);

  // TODO: Fix leftpad if rise/set minutes have 1 digit

  const color = greenRed(moonPhase.fraction);
  return (<WeatherCard title="Moon phase">
    <Text sx={{ color }}>{(moonPhase.fraction * 100).toFixed(2)}% (Waxing Crescent)</Text>
    <Text>Moonrise at {moontimes.rise.getHours()}:{moontimes.rise.getMinutes()}</Text>
    <Text>Moonset at {moontimes.set.getHours()}:{moontimes.set.getMinutes()}</Text>
    <Center sx={{width: "100%"}}>
      <div style={{ width: "150px", aspectRatio: "1", }}>
        <FunctionDiagram
          progress={moonPhase.phase}
          calculateY={x => Math.sin(x * 2 * Math.PI + Math.PI / 2) / 3.5 + 0.5} />
      </div>
    </Center>
  </WeatherCard>
  )
}
