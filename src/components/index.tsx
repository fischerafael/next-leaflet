import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  MapConsumer,
  useMapEvents,
  useMapEvent,
} from "react-leaflet";

const Map = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={initialPosition}
      zoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker />
    </MapContainer>
  );
};

export default Map;

const LocationMarker = () => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  return (
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
