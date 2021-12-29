import { Group } from '@mantine/core'
import React from 'react'
import { AstroLocation } from '../data/AstroLocation';
import { CloudCoverageCard } from './cards/CloudCoverageCard';
import { LightPollutionCard } from './cards/LightPollutionCard';
import { MoonPhaseCard } from './cards/MoonPhaseCard';
import { TemperatureCard } from './cards/TemperatureCard';

interface DashboardProps {
  location: AstroLocation
}

export const Dashboard = ({ location: astroLocation }: DashboardProps) => {
  return (
    <Group grow align="start">
      <CloudCoverageCard location={astroLocation.location} />
      <TemperatureCard location={astroLocation.location} />
      <LightPollutionCard location={astroLocation.location} />
      <MoonPhaseCard />
    </Group>
  )
}
