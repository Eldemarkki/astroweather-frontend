import { Button, Group, Space, Text, TextInput, createStyles } from '@mantine/core';
import { useState } from 'react';
import { AstroLocation } from '../data/AstroLocation';
import { LatitudeLongitude } from '../data/LatitudeLongitude';
import { MarkerMap } from './MarkerMap';

interface EditingModalProps {
  location: AstroLocation;
  locationNames: string[];
  onSave: (newLocation: AstroLocation) => void;
}

const useStyles = createStyles(theme => ({
  editContainer: {
    overflow: "hidden"
  }
}))

export const EditAstroLocationModal = ({ location, locationNames, onSave }: EditingModalProps) => {
  const { classes } = useStyles();
  const [newLocationName, setNewLocationName] = useState(location.name);
  const [markerPosition, setMarkerPosition] = useState<LatitudeLongitude>(location.location);

  const errors: { [key: string]: string; } = {};
  if (newLocationName.length === 0) {
    errors["locationName"] = "Location name must not be empty";
  }
  if (location.name !== newLocationName && (locationNames || []).includes(newLocationName)) {
    errors["locationName"] = "A location with that name already exists";
  }

  return (
    <div className={classes.editContainer}>
      <TextInput error={errors["locationName"]} label="Location name" value={newLocationName} onChange={e => setNewLocationName(e.target.value)} />
      <Text mt={15} mb={10}>Click on a location on the map to select it</Text>
      <MarkerMap
        onMarkerMove={setMarkerPosition}
        initialMapPosition={location.location}
        initialMarkerPosition={location.location}
        initialZoomLevel={11} />
      <Space />
      <Group position="right">
        <Button disabled={Object.keys(errors).length !== 0} onClick={() => onSave(
          {
            name: newLocationName,
            location: markerPosition
          }
        )}>Save</Button>
      </Group>
    </div>
  );
};
