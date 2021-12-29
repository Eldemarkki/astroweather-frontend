import { Text } from '@mantine/core';
import { CardProps } from './CardProps';
import { WeatherCard } from './WeatherCard'
const SunCalc = require("suncalc");

export const SunCard = ({ location }: CardProps) => {
  const suntimes = SunCalc.getTimes(new Date(), location.latitude, location.longitude);

  // TODO: Fix leftpad if rise/set minutes have 1 digit

  return (<WeatherCard title="Sun">
    <Text color="yellow">Sunrise at {suntimes.sunrise.getHours()}:{suntimes.sunrise.getMinutes()}</Text>
    <Text color="yellow">Sunset at {suntimes.sunset.getHours()}:{suntimes.sunset.getMinutes()}</Text>
  </WeatherCard>
  )
}
