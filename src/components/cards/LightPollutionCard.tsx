import { Text } from '@mantine/core'
import React from 'react'
import { WeatherCard } from './WeatherCard'

export const LightPollutionCard = () => {
  return (
    <WeatherCard title="Light pollution">
      <Text color="green">Magnitude 21.78 (Bortle class 3)</Text>
    </WeatherCard>
  )
}
