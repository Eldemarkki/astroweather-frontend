import { Text } from '@mantine/core'
import React from 'react'
import { WeatherCard } from './WeatherCard'

export const CloudCoverageCard = () => {
  return (
    <WeatherCard title="Cloud coverage">
      <Text color="red">Dense</Text>
    </WeatherCard>
  )
}
