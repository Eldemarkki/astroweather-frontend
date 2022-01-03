import React, { useEffect, useRef } from 'react'
import { LatitudeLongitude } from '../data/LatitudeLongitude'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

interface MarkerMapProps {
  initialMarkerPosition?: LatitudeLongitude
  onMarkerMove?: (newPosition: LatitudeLongitude) => void
  initialMapPosition?: LatitudeLongitude
  initialZoomLevel?: number
}

export const MarkerMap = ({
  initialMarkerPosition = { latitude: 0, longitude: 0 },
  initialMapPosition = { latitude: 0, longitude: 0 },
  initialZoomLevel = 1,
  onMarkerMove
}: MarkerMapProps) => {
  const mapContainer = useRef<any>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialMapPosition.longitude, initialMapPosition.latitude],
      zoom: initialZoomLevel
    });

    const markerElement = document.createElement("div");
    markerElement.className = "marker"
    const marker = new mapboxgl.Marker(markerElement)
    marker.setLngLat([initialMarkerPosition.longitude, initialMarkerPosition.latitude]).addTo(map)

    map.on('load', m => m.target.resize());

    map.on("click", (e) => {
      const newPos = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat
      }

      marker.setLngLat([newPos.longitude, newPos.latitude])
      if (onMarkerMove) onMarkerMove(newPos)
    })
  }, [
    initialMapPosition.latitude,
    initialMapPosition.longitude,
    initialMarkerPosition.latitude,
    initialMarkerPosition.longitude,
    initialZoomLevel,
    onMarkerMove
  ]);

  return <div ref={mapContainer} className="map-container"></div>
}
