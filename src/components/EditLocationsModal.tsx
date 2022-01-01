import { Button, createStyles, Group, Text } from '@mantine/core'
import { AstroLocation } from '../data/AstroLocation'
import { latlonToDms } from '../utils/latlonFormat'

interface EditLocationsModalProps {
  locations: AstroLocation[]
  setLocations: (newLocations: AstroLocation[]) => void
  setActiveLocation: (newActiveLocation: AstroLocation) => void
}

interface LocationEntryProps {
  location: AstroLocation
  onDelete: () => void
  canDelete: boolean
}

const useStyles = createStyles(theme => ({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  }
}))

const LocationEntry = ({location, onDelete, canDelete}: LocationEntryProps) => {
  return <Group position="apart">
    <Text>{location.name} ({latlonToDms(location.location)})</Text>
    <Button onClick={onDelete} color="red" disabled={!canDelete}>Delete</Button>
  </Group>
}

export const EditLocationsModal = ({ locations, setLocations, setActiveLocation }: EditLocationsModalProps) => {
  // TODO: Implement editing and reordering
  const { classes } = useStyles();

  return (
    <div className={classes.listContainer}>
      {locations.map((location, index) => (
        <LocationEntry 
          location={location} 
          onDelete={() => {
            if (locations.length !== 1) {
              setActiveLocation(locations[index === 0 ? index + 1 : index - 1])
              setLocations(locations.filter((_,i) => index !== i))
            }}} 
          key={location.name} 
          canDelete={locations.length !== 1}/>)
      )}
    </div>
  )
}
