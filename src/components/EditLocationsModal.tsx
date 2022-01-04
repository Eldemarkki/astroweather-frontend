import { Button, Center, createStyles, Group, List, ListItem, Modal, Text, Title } from '@mantine/core'
import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import { useCallback, useRef, useState } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { AstroLocation } from '../data/AstroLocation'
import { latlonToDms } from '../utils/latlonFormat'
import { EditAstroLocationModal } from './EditAstroLocationModal'

interface EditLocationsModalProps {
  locations: AstroLocation[]
  setLocations: (newLocations: AstroLocation[]) => void
  activeLocationIndex: number
  setActiveLocationIndex: (newActiveLocationIndex: number) => void
}

interface LocationEntryProps {
  location: AstroLocation
  onDelete: () => void
  onEdit: () => void
  canDelete: boolean
  index: number
  moveLocation: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const useStyles = createStyles(theme => ({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15
  }
}))

const LocationEntry = ({ location, onDelete, onEdit, canDelete, index, moveLocation }: LocationEntryProps) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "LocationEntry",
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!dragRef.current) return;
      const dragIndex = item.index;
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = dragRef.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset ? clientOffset.y : 0) - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveLocation(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: "LocationEntry",
    item: () => ({ id: location.name, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })

  const opacity = isDragging ? 0 : 1

  drag(dragRef)
  drop(preview(previewRef))


  return <div ref={previewRef} style={{ opacity }} data-handler-id={handlerId}>
    <Group noWrap>
      <Center ref={dragRef}>
        <DragHandleDots2Icon />
      </Center>
      <Group position="apart" sx={{ flexGrow: 1 }}>
        <Text size="lg">{location.name} ({latlonToDms(location.location)})</Text>
        <Group>
          <Button onClick={onEdit} color="blue">Edit</Button>
          <Button onClick={onDelete} color="red" disabled={!canDelete}>Delete</Button>
        </Group>
      </Group>
    </Group>
  </div>
}

export const EditLocationsModal = ({ locations, setLocations, activeLocationIndex, setActiveLocationIndex }: EditLocationsModalProps) => {
  // TODO: Implement reordering
  const { classes } = useStyles();
  const [editingLocation, setEditingLocation] = useState<AstroLocation | undefined>(undefined)

  const moveLocation = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newLocations = locations.filter((_, i) => i !== dragIndex)
      const finalLocations = newLocations.slice(0, hoverIndex).concat(locations[dragIndex]).concat(newLocations.slice(hoverIndex))
      setLocations(finalLocations)

      // TODO: Make this more elegant (derive the new active location index from dragIndex and hoverIndex, instead of just searching based on names)
      setActiveLocationIndex(finalLocations.findIndex(loc => loc.name === locations[activeLocationIndex].name))
    },
    [locations, setLocations, activeLocationIndex, setActiveLocationIndex],
  )

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
        <List sx={{ listStyleType: "none" }} >
          {locations.map((location, index) => (
            <ListItem key={location.name} sx={{ margin: "10px 0px" }}>
              <LocationEntry
                location={location}
                onDelete={() => {
                  if (locations.length !== 1) {
                    let newIndex = -1
                    if (index < activeLocationIndex) {
                      newIndex = activeLocationIndex - 1
                    }
                    else if (index === activeLocationIndex) {
                      if (index === locations.length - 1) {
                        newIndex = activeLocationIndex - 1
                      }
                      else {
                        newIndex = index
                      }
                    }
                    else { // index > activeLocationIndex
                      newIndex = activeLocationIndex;
                    }

                    setActiveLocationIndex(newIndex)
                    setLocations(locations.filter((_, i) => index !== i))
                  }
                }}
                onEdit={() => setEditingLocation({ ...location })}
                canDelete={locations.length !== 1}
                index={index}
                moveLocation={moveLocation}
              />
            </ListItem>)
          )}
        </List>
      </div>
    </div>
  )
}
