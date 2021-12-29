import { Card, Group, Title } from '@mantine/core'
import React, { FunctionComponent } from 'react'

interface WeatherCardProps {
  title: string,
}

export const WeatherCard: FunctionComponent<WeatherCardProps> = (props) => {
  return (
    <Card>
      <Group direction="column">
        <Title order={2}>{props.title}</Title>
        {props.children}
      </Group>
    </Card>
  )
}
