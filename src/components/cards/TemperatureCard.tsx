import { Text } from '@mantine/core'
import { useParseAstroStats } from '../../hooks/useAstroStats'
import { CardProps } from './CardProps'
import { WeatherCard } from './WeatherCard'

interface TemperatureProps {
  currentTemperature: number;
  feelsLike: number;
}

export const TemperatureCard = ({ location }: CardProps) => {
  const { value, success } = useParseAstroStats<TemperatureProps>("/temperature", location, data => data)
  return (
    <WeatherCard title="Temperature">
      {success ? <div>
        <Text color="blue">{value.currentTemperature}°C</Text>
        <Text color="blue">Feels like {value.feelsLike}°C</Text>
      </div> : <Text>{value}</Text>}
    </WeatherCard>
  )
}
