import { Group } from '@mantine/core'
import React from 'react'
import { AstroLocation } from '../data/AstroLocation';
import { CloudCoverageCard } from './cards/CloudCoverageCard';
import { LightPollutionCard } from './cards/LightPollutionCard';
import { MoonCard } from './cards/MoonCard';
import { SunCard } from './cards/SunCard';
import { TemperatureCard } from './cards/TemperatureCard';

interface DashboardProps {
  location: AstroLocation
}

export const Dashboard = ({ location }: DashboardProps) => {
  return (
    <Group grow align="start">
      <CloudCoverageCard location={location.location} />
      <TemperatureCard location={location.location} />
      <LightPollutionCard location={location.location} />
      <MoonCard location={location.location} />
      <SunCard location={location.location} />
    </Group>
  )
}
