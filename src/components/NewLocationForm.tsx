import { Button, createStyles, Group, Space, Text, TextInput } from '@mantine/core'
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { AstroLocation } from '../data/AstroLocation';

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
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(50);
  const [zoom, setZoom] = useState(1);

  const [locationName, setLocationName] = useState("")

  const [marker, setMarker] = useState([lng, lat])

  const markerElement = document.createElement("div");
  markerElement.className = "marker"

  const [markerObj] = useState(new mapboxgl.Marker(markerElement))

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.on('load', m => m.target.resize());
    markerObj.setLngLat([marker[0], marker[1]]).addTo(map.current)
  });

  useEffect(() => {
    if (markerObj) {
      markerObj.setLngLat([marker[0], marker[1]])
    }
    // If markerObj is also added here, it will generate unnecessary calls to this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker])

  useEffect(() => {
    if (map.current === null) return;
    map.current.on('move', () => {
      setLng(map.current!.getCenter().lng);
      setLat(map.current!.getCenter().lat);
      setZoom(map.current!.getZoom());
    });
  });

  useEffect(() => {
    if (!map.current) return
    map.current.on("click", (e) => setMarker([e.lngLat.lng, e.lngLat.lat]))
  }, [])

  const errors: { [key: string]: string } = {}
  if (locationName.length === 0) {
    errors["locationName"] = "Location name must not be empty"
  }
  if ((props.locationNames || []).includes(locationName)) {
    errors["locationName"] = "A location with that name already exists"
  }

  return (
    <div className={classes.container}>
      <TextInput error={errors["locationName"]} label="Location name" required value={locationName} onChange={e => setLocationName(e.target.value)} />
      <Text mt={15} mb={10}>Click on a location on the map to select it <span style={{ color: "#ff6b6b" }}>*</span></Text>
      <div ref={mapContainer} className="map-container"></div>
      <Space />
      <Group position="right">
        <Button disabled={Object.keys(errors).length !== 0} onClick={() => props.onSubmit(
          {
            name: locationName,
            location: { longitude: marker[0], latitude: marker[1] }
          }
        )}>Create</Button>
      </Group>
    </div>
  )
}
