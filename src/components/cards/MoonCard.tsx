import { Text } from '@mantine/core';
import { format } from 'date-fns';
import { useParseAstroStats } from '../../hooks/useAstroStats';
import { greenRed } from '../../utils/gradients';
import { CardProps } from './CardProps';
import { WeatherCard } from './WeatherCard'

interface MoonData {
  moonriseToday: string;
  moonsetToday: string;
  moonriseTomorrow: string;
  moonsetTomorrow: string;
  currentMoonPhase: number;
}

export const MoonCard = ({ location }: CardProps) => {
  const { value, success } = useParseAstroStats<MoonData>("/moon", location, data => data);

  const moonriseToday = success ? new Date(value.moonriseToday) : new Date()
  const moonsetToday = success ? new Date(value.moonsetToday) : new Date()
  
  const moonIllumination = Math.sin(value.currentMoonPhase * 2 * Math.PI - Math.PI / 2) / 2 + 0.5

  // TODO: Show the correct moon phase name 

  return (<WeatherCard title="Moon">
    {success ? <div>
      <Text sx={{ color: greenRed(moonIllumination) }}>Moon illumination: {(moonIllumination * 100).toFixed(1)}%</Text>
      <Text>{(value.currentMoonPhase * 100).toFixed(2)}% (Waxing Crescent)</Text>
      <Text>Moonrise today at {format(new Date(moonriseToday), "H:mm")}</Text>
      <Text>Moonset today at {format(new Date(moonsetToday), "H:mm")}</Text>
    </div> : <Text>{value}</Text>}
  </WeatherCard>
  )
}
