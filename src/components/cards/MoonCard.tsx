import { Text } from '@mantine/core';
import { format } from 'date-fns';
import { useParseAstroStats } from '../../hooks/useAstroStats';
import { greenRed } from '../../utils/gradients';
import { inRange } from '../../utils/numberUtils';
import { CardProps } from './CardProps';
import { WeatherCard } from './WeatherCard'

interface MoonData {
  moonriseToday: string;
  moonsetToday: string;
  moonriseTomorrow: string;
  moonsetTomorrow: string;
  currentMoonPhase: number;
}

const getMoonPhaseName = (currentMoonPhase: number, epsilon: number = 0.01) => {
  const phase = (currentMoonPhase - epsilon) % 1;
  if (inRange(phase, 0, 2 * epsilon)) return "New Moon"
  if (inRange(phase, 2 * epsilon, 0.25)) return "Waxing Crescent"
  if (inRange(phase, 0.25, 0.25 + 2 * epsilon)) return "First Quarter Moon"
  if (inRange(phase, 0.25 + 2 * epsilon, 0.5)) return "Waxing Gibous"
  if (inRange(phase, 0.5, 0.5 + 2 * epsilon)) return "Full Moon"
  if (inRange(phase, 0.5 + 2 * epsilon, 0.75)) return "Waning Gibous"
  if (inRange(phase, 0.75, 0.75 + 2 * epsilon)) return "Third Quarter Moon"
  if (inRange(phase, 0.75 + 2 * epsilon, 1)) return "Waning Crescent"
  return undefined
}

export const MoonCard = ({ location }: CardProps) => {
  const { value, success } = useParseAstroStats<MoonData>("/moon", location, data => data);

  const moonriseToday = success ? new Date(value.moonriseToday) : new Date()
  const moonsetToday = success ? new Date(value.moonsetToday) : new Date()
  
  const moonIllumination = Math.sin(value.currentMoonPhase * 2 * Math.PI - Math.PI / 2) / 2 + 0.5

  return (<WeatherCard title="Moon">
    {success ? <div>
      <Text sx={{ color: greenRed(moonIllumination) }}>Moon illumination: {(moonIllumination * 100).toFixed(1)}%</Text>
      <Text>{(value.currentMoonPhase * 100).toFixed(1)}% ({getMoonPhaseName(success ? value.currentMoonPhase : 0)})</Text>
      <Text>Moonrise today at {format(new Date(moonriseToday), "H:mm")}</Text>
      <Text>Moonset today at {format(new Date(moonsetToday), "H:mm")}</Text>
    </div> : <Text>{value}</Text>}
  </WeatherCard>
  )
}
