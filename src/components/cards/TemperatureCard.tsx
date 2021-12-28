import { Text } from '@mantine/core'
import React from 'react'
import { WeatherCard } from './WeatherCard'

export const TemperatureCard = () => {
	return (
		<WeatherCard title="Temperature">
			<Text color="blue">-6°C</Text>
		</WeatherCard>
	)
}
