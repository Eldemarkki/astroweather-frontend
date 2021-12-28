import { Group } from '@mantine/core'
import React from 'react'
import { CloudCoverageCard } from './cards/CloudCoverageCard';
import { LightPollutionCard } from './cards/LightPollutionCard';
import { MoonPhaseCard } from './cards/MoonPhaseCard';
import { TemperatureCard } from './cards/TemperatureCard';

interface DashboardProps {
  location: string
}

export const Dashboard = (props: DashboardProps) => {
  // TODO: Use props.location to fetch correct data for the cards
  return (
    <Group grow>
      <CloudCoverageCard />
      <TemperatureCard />
      <LightPollutionCard />
      <MoonPhaseCard />
    </Group>
  )
}
