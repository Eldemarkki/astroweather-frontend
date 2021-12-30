import { Anchor, Text } from '@mantine/core'
import { LatitudeLongitude } from '../../data/LatitudeLongitude'
import { useParseAstroStats } from '../../hooks/useAstroStats'
import { WeatherCard } from './WeatherCard'

interface LightPollutionCardProps {
  location: LatitudeLongitude
}

interface LightPollutionResponse {
  intensityIndex: number;
}

export const LightPollutionCard = ({ location }: LightPollutionCardProps) => {
  // TODO: Implement color scale, and show Bortle class

  const { value } = useParseAstroStats<LightPollutionResponse>("/lightpollution", location, data => `Magnitude: ${data.intensityIndex}`);

  return (
    <WeatherCard title="Light pollution">
      <Text>{value}</Text>
      <Anchor target="_blank" href={`https://www.lightpollutionmap.info/#zoom=12&lat=${location.latitude}&lon=${location.longitude}&layers=B0FFFFFFFTFFFFFFFFFF`}>Open in lightpollutionmap.info</Anchor>
    </WeatherCard >
  )
}
