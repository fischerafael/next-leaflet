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
  const [map, setMap] = useState<any>(null);

  console.log(map);

  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;

      const zoom = 12;
      const duration = 3;

      map.flyTo([latitude, longitude], zoom, { duration });

      setInitialPosition([latitude, longitude]);
    });
  }, [map]);

  return (
    <MapContainer
      style={{ height: "100%", width: "100%" }}
      center={initialPosition}
      zoom={13}
      whenCreated={(map) => setMap(map)}
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
  // const map = useMapEvents({
  //   click() {
  //     map.locate();
  //   },
  //   locationfound: (location) => {
  //     console.log("location found:", location);
  //   },
  // });

  return (
    <Marker position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
