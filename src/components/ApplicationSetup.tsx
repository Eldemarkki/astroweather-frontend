import { MantineProvider } from '@mantine/core'
import React from 'react'
import App from './App'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
 
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "";

export const ApplicationSetup = () => {
  // TODO: Allow the user to change between light/dark modes
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <App />
    </MantineProvider>
  )
}
