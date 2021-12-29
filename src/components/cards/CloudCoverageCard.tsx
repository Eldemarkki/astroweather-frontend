import { Text } from '@mantine/core'
import { useParseAstroStats } from '../../hooks/useAstroStats'
import { greenRed } from '../../utils/gradients'
import { selectLower } from '../../utils/rangeSelect'
import { CardProps } from './CardProps'
import { WeatherCard } from './WeatherCard'

interface CloudinessResponse {
  cloudiness: number;
}

export const CloudCoverageCard = ({ location }: CardProps) => {
  const { value, success } = useParseAstroStats<CloudinessResponse>("/cloudiness", location, data => data.cloudiness);

  const text = selectLower({
    0: "None",
    10: "Very little",
    25: "Little",
    50: "Medium",
    75: "Dense",
    90: "Very dense"
  }, value)

  return (
    <WeatherCard title="Cloud coverage">
      {success ? <Text sx={{ color: greenRed(value / 100) }}>{value}% ({text})</Text> : <Text>{value}</Text>}
    </WeatherCard>
  )
}
