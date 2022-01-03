import { Anchor, Text } from '@mantine/core'
import { LatitudeLongitude } from '../../data/LatitudeLongitude'
import { useParseAstroStats } from '../../hooks/useAstroStats'
import { WeatherCard } from './WeatherCard'

interface LightPollutionCardProps {
  location: LatitudeLongitude
}

interface LightPollutionResponse {
  totalBrightness: number;
  skyMagnitude: number
  bortleClass: number
}

export const LightPollutionCard = ({ location }: LightPollutionCardProps) => {
  const { value, success } = useParseAstroStats<LightPollutionResponse>("/lightpollution", location, data => data);
  return <WeatherCard title="Light pollution">
    {success ? <div>
      <Text>Bortle class: {value.bortleClass}</Text>
      <Text>Magnitude (mag/arcsec²): {value.skyMagnitude.toFixed(2)}</Text>
    </div> : <Text>Couldn't load light pollution data</Text>}
    <Anchor target="_blank" href={`https://www.lightpollutionmap.info/#zoom=12&lat=${location.latitude}&lon=${location.longitude}&layers=B0FFFFFFFTFFFFFFFFFF`}>Open in lightpollutionmap.info</Anchor>
  </WeatherCard >
}
