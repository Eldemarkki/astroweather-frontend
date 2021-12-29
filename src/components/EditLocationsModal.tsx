import { List, ListItem } from '@mantine/core'
import React from 'react'
import { AstroLocation } from '../data/AstroLocation'
import { latlonToDms } from '../utils/latlonFormat'

interface EditLocationsModalProps {
  locations: AstroLocation[],
  setLocations: (newLocations: AstroLocation[]) => void
}

export const EditLocationsModal = ({ locations, setLocations }: EditLocationsModalProps) => {
  // TODO: Implement editing, deleting and reordering
  return (
    <div>
      <List>
        {locations.map(location => (<ListItem key={location.name}>
          {location.name} ({latlonToDms(location.location)})
        </ListItem>))}
      </List>
    </div>
  )
}
