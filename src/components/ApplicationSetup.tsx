import { MantineProvider } from '@mantine/core'
import React from 'react'
import App from './App'

export const ApplicationSetup = () => {
  // TODO: Allow the user to change between light/dark modes
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <App />
    </MantineProvider>
  )
}
