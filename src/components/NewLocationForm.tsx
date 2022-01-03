import { Button, createStyles, Group, Space, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import { AstroLocation } from '../data/AstroLocation';
import { LatitudeLongitude } from '../data/LatitudeLongitude';
import { MarkerMap } from './MarkerMap';

const useStyles = createStyles(theme => ({
  container: {
    overflow: "hidden"
  }
}));

interface NewLocationFormProps {
  onSubmit: (newLocation: AstroLocation) => void,
  locationNames?: string[]
}

export const NewLocationForm = (props: NewLocationFormProps) => {
  const { classes } = useStyles();

  const [locationName, setLocationName] = useState("")

  const errors: { [key: string]: string } = {}
  if (locationName.length === 0) {
    errors["locationName"] = "Location name must not be empty"
  }
  if ((props.locationNames || []).includes(locationName)) {
    errors["locationName"] = "A location with that name already exists"
  }

  const defaultMarkerPosition: LatitudeLongitude = {
    latitude: 50,
    longitude: 0
  }

  const [markerPosition, setMarkerPosition] = useState<LatitudeLongitude>(defaultMarkerPosition)

  return (
    <div className={classes.container}>
      <TextInput error={errors["locationName"]} label="Location name" required value={locationName} onChange={e => setLocationName(e.target.value)} />
      <Text mt={15} mb={10}>Click on a location on the map to select it <span style={{ color: "#ff6b6b" }}>*</span></Text>
      <MarkerMap onMarkerMove={setMarkerPosition} initialMapPosition={defaultMarkerPosition} initialMarkerPosition={defaultMarkerPosition} />
      <Space />
      <Group position="right">
        <Button disabled={Object.keys(errors).length !== 0} onClick={() => props.onSubmit(
          {
            name: locationName,
            location: markerPosition
          }
        )}>Create</Button>
      </Group>
    </div>
  )
}
