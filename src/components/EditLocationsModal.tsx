import { Button, createStyles, Group, Modal, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { AstroLocation } from '../data/AstroLocation'
import { latlonToDms } from '../utils/latlonFormat'
import { EditAstroLocationModal } from './EditAstroLocationModal'

interface EditLocationsModalProps {
  locations: AstroLocation[]
  setLocations: (newLocations: AstroLocation[]) => void
  setActiveLocation: (newActiveLocation: AstroLocation) => void
}

interface LocationEntryProps {
  location: AstroLocation
  onDelete: () => void
  onEdit: () => void
  canDelete: boolean
}

const useStyles = createStyles(theme => ({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  }
}))

const LocationEntry = ({ location, onDelete, onEdit, canDelete }: LocationEntryProps) => {
  return <Group position="apart">
    <Text size="lg">{location.name} ({latlonToDms(location.location)})</Text>
    <Group>
      <Button onClick={onEdit} color="blue">Edit</Button>
      <Button onClick={onDelete} color="red" disabled={!canDelete}>Delete</Button>
    </Group>
  </Group>
}

export const EditLocationsModal = ({ locations, setLocations, setActiveLocation }: EditLocationsModalProps) => {
  // TODO: Implement reordering
  const { classes } = useStyles();
  const [editingLocation, setEditingLocation] = useState<AstroLocation | undefined>(undefined)

  return (
    <div>
      <Modal
        opened={Boolean(editingLocation)}
        onClose={() => setEditingLocation(undefined)}
        size={800}
        title={<Title order={2}>Editing {editingLocation ? editingLocation.name : ""}</Title>}>
        {editingLocation && <EditAstroLocationModal locationNames={locations.map(l => l.name)} location={editingLocation} onSave={newLocation => {
          setLocations(locations.map(l => l.name === editingLocation.name ? newLocation : l))
          setEditingLocation(undefined);
        }} />}
      </Modal>
      <div className={classes.listContainer}>
        {locations.map((location, index) => (
          <LocationEntry
            location={location}
            onDelete={() => {
              if (locations.length !== 1) {
                setActiveLocation(locations[index === 0 ? index + 1 : index - 1])
                setLocations(locations.filter((_,i) => index !== i))
              }}}
            onEdit={() => setEditingLocation({ ...location })}
            key={location.name}
            canDelete={locations.length !== 1}/>)
        )}
      </div>
    </div>
  )
}
