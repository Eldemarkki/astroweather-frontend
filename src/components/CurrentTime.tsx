import { Text } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { start, stop } = useInterval(() => {
    setCurrentTime(new Date())
  }, 1000)

  useEffect(() => {
    start();
    return stop;
  })

  return <Text size="lg" style={{ whiteSpace: "nowrap" }}>{currentTime.toLocaleString()}</Text>
}
